const keys: Array<Array<string>> = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Keyboard = () => {
    return (
        <div>
            {keys.map(keyRow => (
                keyRow.map((key) => (
                    <div key={key}>
                        {key}
                    </div>
                ))
            ))}
        </div>
    );
};

export default Keyboard;