describe('addItemForm', () => {
    it('base example,visually looks correct', async () => {
        //API from jest-puppeteer
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example&viewMode=story');
        const image = await page.screenshot();

        //API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    })
})

describe('App', () => {
    it('App component,visually looks correct', async () => {
        //API from jest-puppeteer
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-app--app-with-redux-new-stories&viewMode=story');
        const image = await page.screenshot();

        //API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    })
})
