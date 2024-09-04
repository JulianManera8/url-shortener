import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LocationStats({ stats = [] }) {

    const cityCount = stats.reduce((acc, item) => {
        if (acc[item.city]) {
            acc[item.city] += 1;
        } else acc[item.city] = 1;
        return acc;
    }, {});

    const cities = Object.entries(cityCount).map(([city, count]) => ({
        city,
        count,
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={cities.slice(0, 5)}>
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "green"}} filterNull />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" barSize={35}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
