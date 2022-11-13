import { QuoteCard } from 'components/Card/quoteCard';
import { useSelector } from 'react-redux';
const tinycolor = require('tinycolor2');
const Home = () => {
    const colors = useSelector((state) => state.colorGeneration.colors);
    const initialColor = useSelector((state) => state.colorGeneration.inputColor);
    return (
        <div>
            Hello
            {/* {colors.map((color) => (
                <QuoteCard
                    key={color.hex}
                    colorData={[
                        tinycolor(color.hex).toHex().toUpperCase(),
                        initialColor,
                    ]}
                    isQuote
                />
            ))} */}
        </div>
    )
}

export default Home;