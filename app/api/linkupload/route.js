import {writeFile ,unlink} from 'fs/promises' 
import ConnectDb from '@/lib/connect'
import { PageModel } from '@/models/Page'
import { NextResponse } from 'next/server' 

ConnectDb()
 


// export async function POST(request) {
//    try {
//      const formData = await request.formData();
//      const owner = formData.get('user');
//      const linkDataString = formData.get('link');
 
//      let linkData = [];
//      if (linkDataString) {
//        linkData = JSON.parse(linkDataString);
//      }
 
//      console.log('Parsed link data:', linkData);
 
//      // Check if the page exists
//      const page = await PageModel.findOne({ owner });
//      if (!page) {
//        return NextResponse.json({ success: false, message: 'Page not found' });
//      }
 
//      // Process each image
//      for (const [key, file] of formData.entries()) {
//        if (key.startsWith('icon_') && file instanceof File) {
//          const imageByteData = await file.arrayBuffer();
//          const buffer = Buffer.from(imageByteData);
//          const newFileName = `${Date.now()}_${file.name}`;
//          const path = `./public/${newFileName}`;
 
//          await writeFile(path, buffer);
 
//          // Update linkData to include the new file name
//          linkData = linkData.map(link =>
//            link.key === key.replace('icon_', '') ? { ...link, icon: newFileName } : link
//          );
//        }
//      }
 
//      // Update the page document with new link data
//      await PageModel.updateOne({ owner }, { $set: { links: linkData } });
 
//      return NextResponse.json({ success: true, message: 'Data saved successfully!' });
//    } catch (error) {
//      console.error('Error in POST handler:', error);
//      return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
//    }
//  }
 
 

export async function POST(request) {
  try {
    const formData = await request.formData();
    const owner = formData.get('user');
    const linkDataString = formData.get('link');

    let linkData = [];
    if (linkDataString) {
      linkData = JSON.parse(linkDataString);
    }

    console.log('Parsed link data:', linkData);

    // Check if the page exists
    const page = await PageModel.findOne({ owner });
    if (!page) {
      return NextResponse.json({ success: false, message: 'Page not found' });
    }

    // Store the old icons before updating
    const oldLinks = page.links || [];

    // Process each image
    for (const [key, file] of formData.entries()) {
      if (key.startsWith('icon_') && file instanceof File) {
        const imageByteData = await file.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const newFileName = `${Date.now()}_${file.name}`;
        const path = `./public/${newFileName}`;

        await writeFile(path, buffer);

        // Update linkData to include the new file name
        linkData = linkData.map(link =>
          link.key === key.replace('icon_', '') ? { ...link, icon: newFileName } : link
        );

        // Unlink the previous icon if it exists
        const oldLink = oldLinks.find(link => link.key === key.replace('icon_', ''));
        if (oldLink && oldLink.icon) {
          const oldFilePath = `./public/${oldLink.icon}`;
          try {
            await unlink(oldFilePath);
            console.log(`Successfully unlinked previous image: ${oldFilePath}`);
          } catch (err) {
            console.error(`Error while unlinking previous image: ${oldFilePath}`, err);
          }
        }
      }
    }

    // Update the page document with new link data
    await PageModel.updateOne({ owner }, { $set: { links: linkData } });

    return NextResponse.json({ success: true, message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
