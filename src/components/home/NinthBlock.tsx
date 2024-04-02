import React, {useState} from "react";
import "../../styles/home/ninth_block.css"

const NinthBlock: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState(false);
    const [secondAnswer, setSecondAnswer] = useState(false);
    const [thirdAnswer, setThirdAnswer] = useState(false);
    const [fourthAnswer, setFourthAnswer] = useState(false);


    function handleFirstAnswer() {
        setFirstAnswer(!firstAnswer);
    }

    function handleSecondAnswer() {
        setSecondAnswer(!secondAnswer);
    }

    function handleThirdAnswer() {
        setThirdAnswer(!thirdAnswer);
    }

    function handleFourthAnswer() {
        setFourthAnswer(!fourthAnswer);
    }

    return (
        <div className="page_content">
            <div className="ninth_block">
                <div className="block_info_title" style={{ marginRight: 'auto'}}>Ответы на популярные вопросы</div>
                <div className="questions">
                    <div className="question_column">
                        <div className="question_and_answer_block">
                            <div className="question_block" onClick={handleFirstAnswer}>
                                <div className="question">Увеличиваются ли сроки поставки при работе через нас?</div>
                                <div className="question_cross" style={{transform: firstAnswer ? 'rotate(45deg)' : 'none'}}>
                                    <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" ><g stroke="none" strokeWidth="1px" fill="none" fillRule="evenodd" strokeLinecap="square"><g transform="translate(1.000000, 1.000000)" stroke="#222222"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></g></svg>
                                </div>
                            </div>
                            <div className="answer" style={{maxHeight: firstAnswer ? 90 : 0}}>
                                <br className="br_first_answer"/>Напротив, они уменьшатся. За счет штата упаковщиков и грамотной
                                логистики</div>

                        </div>
                        <div className="question_and_answer_block" style={{ borderBottom: '1px solid rgb(238, 238, 238)'}}>
                            <div className="question_block big_question" onClick={handleSecondAnswer}>
                                <div className="question">Каков уровень надежности упаковки товаров при использовании Вашего сервиса?</div>
                                <div className="question_cross" style={{transform: secondAnswer ? 'rotate(45deg)' : 'none'}}>
                                    <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" ><g stroke="none" strokeWidth="1px" fill="none" fillRule="evenodd" strokeLinecap="square"><g transform="translate(1.000000, 1.000000)" stroke="#222222"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></g></svg>
                                </div>
                            </div>
                            <div className="answer" style={{maxHeight: secondAnswer ? 173 : 0}} ><br/>Для того, чтобы гарантировать безопасность хрупких товаров в
                                процессе транспортировки, мы используем специальные амортизационные прокладки и
                                пупырчатый полиэтилен. Это позволяет минимизировать риск повреждения товаров во время
                                перевозки.</div>
                        </div>
                    </div>
                    <div className="question_column">
                        <div className="question_and_answer_block">
                            <div className="question_block big_question" onClick={handleThirdAnswer}>
                                <div className="question">Возможно ли, что вы перепутаете похожие товары при сборе заказа?</div>
                                <div className="question_cross" style={{transform: thirdAnswer ? 'rotate(45deg)' : 'none'}}>
                                    <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" ><g stroke="none" strokeWidth="1px" fill="none" fillRule="evenodd" strokeLinecap="square"><g transform="translate(1.000000, 1.000000)" stroke="#222222"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></g></svg>
                                </div>
                            </div>
                            <div className="answer" style={{maxHeight: thirdAnswer ? 200 : 0}} ><br/>Мы гарантируем точность и правильность сборки Вашего заказа
                                благодаря использованию системы маркировки товаров с помощью штрих-кодов. После
                                маркировки, товары считываются и автоматически классифицируются нашей системой, что
                                позволяет исключить возможность перепутать похожие товары, даже если они визуально
                                идентичны. Таким образом, мы гарантируем правильность и точность сборки каждого заказа,
                                что обеспечивает высокое качество нашего сервиса.</div>
                        </div>
                        <div className="question_and_answer_block" style={{ borderBottom: '1px solid rgb(238, 238, 238)'}}>
                            <div className="question_block" onClick={handleFourthAnswer}>
                                <div className="question" >Будет ли водитель ожидать принятия груза?</div>
                                <div className="question_cross" style={{transform: fourthAnswer ? 'rotate(45deg)' : 'none'}}>
                                    <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" ><g stroke="none" strokeWidth="1px" fill="none" fillRule="evenodd" strokeLinecap="square"><g transform="translate(1.000000, 1.000000)" stroke="#222222"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></g></svg>
                                </div>
                            </div>
                            <div className="answer"  style={{maxHeight: fourthAnswer ? 173 : 0}} >Наш водитель не только дождется приема груза, но также готов
                            предоставить помощь в решении возможных проблем с поставкой, которые могут возникнуть
                            со стороны клиента. В тесном сотрудничестве с логистом, водитель готов принять все
                            необходимые меры для исправления ошибок и успешной доставки груза на склад.</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};
export default NinthBlock;