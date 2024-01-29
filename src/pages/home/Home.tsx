import React from "react";
import FirstBlock from "../../components/home/FirstBlock";
import SecondBlock from "../../components/home/SecondBlock";
import ThirdBlock from "../../components/home/ThirdBlock";
import FourthBlock from "../../components/home/FourthBlock";

const Home: React.FC<{}> = () => {
    return (
        <div>
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <FourthBlock />
        </div>
    )
}

export default Home;

