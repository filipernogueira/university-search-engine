const RankingTable = ({ universities }) => {
    return (
        <>
            <table className="w-1/2 divide-y divide-gray-200 mt-10">
                <thead>
                    <tr>
                        <th className="text-center p-3 bg-secondary text-xs font-medium text-white uppercase tracking-wider rounded-tl-lg rounded-bl-lg">
                            Rank
                        </th>
                        <th className="text-center p-3 bg-secondary text-xs font-medium text-white uppercase tracking-wider">
                            Name
                        </th>
                        <th className="text-center p-3 bg-secondary text-xs font-medium text-white uppercase tracking-wider rounded-tr-lg rounded-br-lg">
                            Country
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {universities.map((university, idx) => (
                        <tr key={idx}>
                            <td className="text-center p-4">{idx + 1}</td>
                            <td className="text-center p-4">
                                {university.name}
                            </td>
                            <td className="text-center p-4">
                                {university.country}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default RankingTable;
