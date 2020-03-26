// 아이템 DB 초기 설정
function setConsumptionItems() {
    mongoUtil.connectToServer(async (err) => {

        // DB 데이터

        const item = new Item({
            name: '영양식',
            detail: '영양소가 골고루 들어가 있는 음식. 포만감를 6 회복시켜준다.',
            prices: [10, 5],
            type: 'Consumption',
            abilities: ['Satiety'],
            values: [6],
            durations: [1],
        });

        await item.save();
        console.log(item);

        const item2 = new Item({
            name: '소형 치료약',
            detail: '체력을 30 회복시켜주는 작은 물약.',
            prices: [20, 10],
            type: 'Consumption',
            abilities: ['Recovery'],
            values: [30],
            durations: [1],
        });

        await item2.save();
        console.log(item2);

        const item3 = new Item({
            name: '중형 치료약',
            detail: '체력을 60 회복시켜주는 물약.',
            prices: [50, 25],
            type: 'Consumption',
            abilities: ['Recovery'],
            values: [60],
            durations: [1],
        });

        await item3.save();
        console.log(item3);

        const item4 = new Item({
            name: '대형 치료약',
            detail: '체력을 100 회복시켜주는 큰 물약.',
            prices: [100, 50],
            type: 'Consumption',
            abilities: ['Recovery'],
            values: [100],
            durations: [1],
        });

        await item4.save();
        console.log(item4);

        const item5 = new Item({
            name: '피로회복제',
            detail: '피로도를 7 회복시켜주는 회복제.',
            prices: [50, 25],
            type: 'Consumption',
            abilities: ['Fatigue'],
            values: [7],
            durations: [1],
        });

        await item5.save();
        console.log(item5);
    });
}