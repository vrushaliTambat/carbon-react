import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';


ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement
)
const options = {
    indexAxis: 'x',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Roles'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Number of employees'
            }
        }
    }
};
//const labels = ["Intern", "Software Engineer", "Business Analyst", "Team Lead", "Manager"]
// const chartData = {
//     labels,
//     datasets: [
//         {
//             label: "Male",
//             data: [500, 900, 540, 500, 750, 800, 650, 700],
//             backgroundColor: 'yellow',
//             borderColor: 'red'
//         },
//         {
//             label: "Female",
//             data: [550, 400, 450, 870, 500, 700, 650, 800],
//             backgroundColor: 'yellow',
//             borderColor: 'black'

//         },
//     ],

// };
const LineGraph = () => {
    const [chartData, setChartData] = useState(
        {
            labels: ["Intern", "Software Engineer", "Business Analyst", "Team Lead", "Manager"],
            datasets: [
                {
                    label: "Male",
                    data: [],
                    backgroundColor: 'yellow',
                    borderColor: 'red'
                },
                {
                    label: "Female",
                    data: [],
                    backgroundColor: 'yellow',
                    borderColor: 'black'

                },
            ],

        }
    );
    useEffect(() => {
        const fetchData = async () => {
            let labelSet = [];
            let dataSet1 = {};
            let dataSet2 = {};
            await fetch(`http://localhost:8080/chartData`)
                .then((data) => {
                    console.log("Api data", data)
                    const res = data.json();
                    return res;
                }).then((res) => {
                    const { roles, male, female } = res;
                    labelSet = roles;
                    dataSet1 = male;
                    dataSet2 = female;
                    // for (var i = 0; i < male.length; i++) {
                    //     dataSet1[male[i]._id] = male[i].count;
                    // }
                    // for (var i = 0; i < female.length; i++) {
                    //     dataSet2[female[i]._id] = female[i].count;
                    // }
                })
            console.log('DATASET 1', dataSet1);
            console.log('DATASET 2', dataSet2);
            console.log('LABELS', labelSet);
            setChartData({
                labels: labelSet,
                datasets: [
                    {
                        label: "Male",
                        data: dataSet1,
                        backgroundColor: 'yellow',
                        borderColor: 'red'
                    },
                    {
                        label: "Female",
                        data: dataSet2,
                        backgroundColor: 'yellow',
                        borderColor: 'black'

                    },
                ],
            })
            console.log("arrData", dataSet1, dataSet2)
        }
        fetchData();
    }, [])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const labelSet = new Set();
    //         const dataSet1 = [];
    //         const dataSet2 = [];
    //         await fetch(`http://localhost:8080/tableData`)
    //             .then((data) => {
    //                 console.log("Api data", data)
    //                 const res = data.json();
    //                 return res;
    //             }).then((res) => {
    //                 console.log("responseee", res)
    //                 for (const val of res) {
    //                     labelSet.add(val.role);
    //                     dataSet1.push(val.id);
    //                     dataSet2.push(val.id + 6);
    //                 }
    //             })
    //         console.log('DATASET 1', dataSet1);
    //         console.log('DATASET 2', dataSet2);
    //         console.log('LABELS', [...labelSet].sort());
    //         setChartData({
    //             labels: [...labelSet],
    //             datasets: [
    //                 {
    //                     label: "Male",
    //                     data: dataSet1,
    //                     backgroundColor: 'yellow',
    //                     borderColor: 'red'
    //                 },
    //                 {
    //                     label: "Female",
    //                     data: dataSet2,
    //                     backgroundColor: 'yellow',
    //                     borderColor: 'black'

    //                 },
    //             ],
    //         })
    //         console.log("arrData", dataSet1, dataSet2)
    //     }
    //     fetchData();
    // }, [])
    return (
        <div style={{ width: '1000px', height: '1000px' }}>
            <Line data={chartData} options={options}>Hello</Line>
        </div>
    )

}

// const LineGraph = () => {
//     const [data, setData] = useState({
//         labels: ["Intern", "Software Engineer", "Business Analyst", "Team Lead", "Manager"],
//         datasets: [
//             {
//                 label: "First Dataset",
//                 data: [500, 900, 540, 500, 750, 800, 650, 700],
//                 backgroundColor: 'yellow',
//                 borderColor: 'red'
//             },
//             {
//                 label: "Second Dataset",
//                 data: [550, 400, 450, 870, 500, 700, 650, 800],
//                 backgroundColor: 'yellow',
//                 borderColor: 'black'

//             }
//         ]
//     })
//     return (
//         <div style={{ width: '800px', height: '800px' }}>
//             <Line data={data}>Hello</Line>
//         </div>
//     );
// };
//[...labelSet].sort()


export default LineGraph;