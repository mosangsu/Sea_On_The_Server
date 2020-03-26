function setConsumptionMerchant() {
    mongoUtil.connectToServer(async (err) => {

        // DB 데이터

        const item = await Item.find({type: 'Consumption'});
        let ids = [];
        for (let i = 0; i < item.length; i++) {
            ids[i] = item[i]._id;
        }

        console.log(item);

        const npc = new NPC({
            name: '싸다싸 사장님',
            location: 'ItemShop',
            type: ['Merchant'],
            scripts: ['와아~ 잘생긴 손님이 오셨네~ 잘 왔어요!\n오늘은 정말 정말 좋은 물건들이 많이 들어왔거든요.',
                '어서오세요! 아이고, 아이고…! (우당탕쿵탕)\n아니 누가 여기다 물건을 쌓아 논거야!'],
            products: ids
        });

        await npc.save();
        console.log(npc);
    });
}