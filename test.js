let data = {
    animated: {
        1: 'Ami Bụng Bự/1/24',
        2: 'Kim & Yim/25/31',
        3: 'Bạch Tuột/32/36',
        4: 'Pokemon/37/41',
    },
    static:{
        1: 'Đậu Đỏ/1/22',
        2: 'Heo Hồng/23/38',
        3: 'Trọc Trắng/39/50',
        4: 'Quỳnh Aka/51/78'
    }
};

// for(let key in data){
//     for(let key2 in data[key]){
//         console.log(data[key][key2])
//     }
// }

let data2 = [{
    "animated": {
        "1": "Ami Bụng Bự/1/24",
        "2": "Kim & Yim/25/31",
        "3": "Bạch Tuột/32/36",
        "4": "Pokemon/37/41"
    },
    "static":{
        "1": "Đậu Đỏ/1/22",
        "2": "Heo Hồng/23/38",
        "3": "Trọc Trắng/39/50",
        "4": "Quỳnh Aka/51/78"
    }

},{
    "animated": {
        "1": [1, 3],
        "3": [32, 35]
    },
    "static":{
        "1": [1, 3, 9],
        "2": [3]
    }
}
]

console.log(data2[1]["animated"]["1"].length)