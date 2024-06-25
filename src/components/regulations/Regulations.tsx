import React from "react";
import "../../styles/regulations/regulations.css"
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";
import regulations_1 from "../../static/regulations_1.png";
import regulations_2 from "../../static/regulations_2.png";
import regulations_3 from "../../static/regulations_3.png";
import regulations_4 from "../../static/regulations_4.png";


const Regulations: React.FC = () => {
    return(
        <div className="page_content">
            <HelmetProvider>
                <Helmet
                    title="Условия и положения"
                />
            </HelmetProvider>
                <div className="regulations">
                    <b style={{textAlign: "center", marginBottom: 20}}>Уважаемые поставщики!</b>
                        <span>В данном регламенте собрана вся необходимая информация для:</span>
                    <ul>
                        <li>правильной записи на нашем сайте;</li>
                        <li>сдачи коробов на наш фулфилмент,</li>
                        <li>а также, для успешной сдачи груза на складах маркетплейсов. Просим внимательно ознакомиться
                            с нижеизложенной информацией, которая поможет избежать ошибок при сдаче груза</li>
                    </ul>

                    <p style={{textAlign: "center"}}>Инструкция <span style={{textDecoration: 'underline'}}>перед записью на фулфилмент</span></p>
                    <ol>
                        <li>Подписаться на наш телеграмм-канал: <a href="https://t.me/wbdostavkasamara">https://t.me/wbdostavkasamara</a>,
                            где мы выкладываем все важные объявления, касающиеся отгрузки на маркетплейсы. Все новости, публикующиеся
                            в телеграмм-канале <a href="https://t.me/wbdostavkasamara">https://t.me/wbdostavkasamara</a> являются частью правил отгрузки.</li>
                        <li>На нашем сайте <a href="https://ivlev-ff.ru/">https://ivlev-ff.ru</a> в разделе «Расписание
                            поставок» Вы можете ознакомиться с различной информацией, такой как: по каким направлениям
                            мы отправляем груз, когда происходит прием коробов на нашем складе (надпись под датой
                            отгрузки с пометкой «приём до»), а также вы можете рассчитать стоимость отправки, нажав на
                            кнопку «Рассчитать стоимость»:
                            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', margin: 15}}>
                                <img src={regulations_1} style={{width: '50%'}} alt="Рассчитать стоимость"/>
                            </div>
                        </li>
                        <li>Создать у себя в личном кабинете маркетплейса поставку. В личном кабинете на маркетплейсе
                            при создании поставки можете указать <b>любые временные</b> данные водителя: <br/>
                            Актуальные данные водителя, а именно имя, фамилию, марку машины и номер машины мы отправляем
                            в наш телеграмм-канал <b>в день приёма товара или в течение следующего дня</b> и тогда следует
                            отредактировать данные водителя в разделе «пропуск». Номер телефона в личном кабинете
                            желательно указать <span style={{textDecoration: 'underline'}}>собственный</span>&nbsp;
                            для поддержания связи с маркетплейсом.</li>
                        <li>Оставить заявку на нашем сайте в разделе «Расписание поставок» <a href="https://ivlev-ff.ru/raspisaniye">
                            https://ivlev-ff.ru/raspisaniye</a>. Оставлять заявку необходимо не позднее 22:00
                            <b>за день</b> до даты приёма груза на наш склад или забора груза с Вашего адреса.</li>
                        <li>Далее производится оплата. Доставку необходимо оплатить в тот же день, когда менеджер
                            отправит Вам счёт до 22:00. Ответным сообщением необходимо отправить менеджеру чек,
                            подтверждающий оплату.</li>
                    </ol>
                    <p style={{textAlign: "center"}}>Инструкция <span style={{textDecoration: 'underline'}}>для подачи заявки на фулфилмент</span></p>
                    <ol>
                        <li>Выбираете желаемую дату отгрузки на склад маркетплейса (крупная дата слева, прим. 21.01.24)
                            и необходимый город (прим. Москва) и нажимаете на кнопку «записаться» справа:
                            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', margin: 15}}>
                                <img src={regulations_2} style={{width: '50%'}} alt="Записаться"/>
                            </div>
                            Примечание: Груз на склад фулфилмента должен быть доставлен не позже даты указанной в графе
                            «приём до». Обратите внимание! В день приема груз принимается СТРОГО до 12:00! Если вы
                            привозите груз нам <span style={{textDecoration: 'underline'}}>заблаговременно</span>&nbsp;
                             (за несколько дней или за день до даты приёма груза), груз можно привезти до 17:00:
                        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', margin: 15}}>
                            <img src={regulations_3} style={{width: '10%'}} alt="Рассчитать стоимость"/>
                        </div>
                        </li>
                        <li>В графе «Юридическое лицо» необходимо указать наименование ИП/ООО/Самозанятый. (прим. ИП
                            Иванов, ООО Иван и Ко, Самозанятый Иванов)</li>
                        <li>В графе «Ваш номер телефона» необходимо указать номер человека, к которому можно обратиться
                            в случае возникновения каких-либо вопросов по поставке. Номер телефона должен быть
                            актуальным и <b>в день сдачи груза</b> на маркетплейс. Также на данный номер телефона будет
                            отправляться счёт для оплаты доставки груза.</li>
                        <li>В графе «Размеры и количество коробок/паллет» необходимо указать верное количество и верные 
                            размеры коробов. Отредактировать
                            заявку в личном кабинете на нашем сайте (в том числе количество и размер коробов) можно до
                            закрытия записи. Запись на сайте закрывается в 22:00. <br/>
                            После того, как закрылась запись, отредактировать (увеличить/уменьшить) количество коробов 
                            или их размер будет <span style={{textDecoration: 'underline'}}>невозможно</span>.
                            В случае, если Вы привезёте на отправку меньшее количество
                            коробов или короба меньшего размера, счет будет выставлен, согласно информации в Вашей заявке. 
                            В случае, если Вы привезёте короба большего размера или большее количество коробов, то при 
                            отсутствии свободного места в грузовом автомобиле, поставка может быть не отправлена и 
                            оставлена на нашем складе. <br/>
                            В случае, если Вы отправляете груз паллетой, в графе «размер коробов» нужно указать длину,
                            ширину и высоту паллеты (без учёта поддона). К поставке допускаются поддоны размером
                            строго <b>120/80 см.</b> <br/>
                            Если отгрузка совершается паллетой, расчёт стоимости ведётся от полутора кубических метров.
                            Если паллета занимает менее полутора кубических метров, то оплата будет из расчёта полтора
                            кубических метра.
                        </li>
                        <li>В графе «Тип поставки» важно выбрать верный тип. <br/>
                            <ul>
                                <li>Короб – это поставка типа «короб», если у Вас один или несколько видов товара (один или
                                несколько штрих-кодов) в одном коробе.</li>
                                <li>Монопаллет – это поставка типа «монопаллет». </li>
                                <li>Транзит – это транзитная поставка.</li>
                            </ul>
                        </li>
                        <li>В графе «Город отправки» необходимо указать город, с которого вы отправляете поставку 
                            (Самара или Тольятти). В случае, если город указан неверно, то сумма рассчитывается за
                            выбранный город в заявке, изменить сумму в день отгрузки невозможно. </li>
                        <li>В графе «Склад назначения» необходимо указать склад, в который Вы хотите отправить свой 
                            товар (прим. Электросталь/Коледино/Тула)</li>
                        <li>Если доставка ведется на склад Ozon, то появится поле «Номер заказа», который необходимо
                            заполнить.</li>
                        <li>В графе «Забрать со склада» необходимо выбрать, нужен ли Вам забор по городу от Вашего
                            адреса нашим грузовым авто.</li>
                        <li>В графе «Доп. комментарий»:
                            <ul>
                                <li>если в графе «Забрать со склада» Вы выбрали «Да», то необходимо
                                    указать точный адрес забора и контактный номер телефона лица, который будет
                                    передавать Ваш груз водителю;</li>
                                <li>если Ваш товар находится на нашем фулфилменте на упаковке, необходимо указать
                                    «Товар на упаковке»;</li>
                                <li>если Вы записываетесь впервые, необходимо указать ссылку на Ваш телеграмм, на
                                    который в дальнейшем будет отправлен счёт и через который будет поддерживаться
                                    связь с нашим менеджером.</li>
                            </ul>
                        </li>
                        <li>Нажать кнопку «Записаться». <b>ВАЖНО!</b> Если Вы оставляете сразу несколько заявок на разные
                            города и склады, необходимо после каждой заявки <b>обновлять страницу сайта</b> в браузере.</li>
                        <li>Если Вы впервые пользуетесь услугами нашего фулфилмента, необходимо написать нашему
                            менеджеру в телеграмме  <a href="tg://resolve?domain=Ivlevff">@Ivlevff</a>, наименование юридического лица и сообщить, что Вы подали
                            заявку впервые. Это необходимо для того, чтобы мы внесли Вас в наш реестр и нам с Вами
                            было проще коммуницировать.</li>
                    </ol>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Правила подготовки груза для передачи на фулфилмент</p>
                    <p>Груз сдаётся в плотных, целых, не рваных коробах, на которых нет посторонних надписей и
                        штрих-кодов. Короба, не соответствующие требованиям маркетплейса (рваные, переполненные
                        «пузатые», плохо закрытые, грязные, влажные, с наличием посторонних штрих-кодов) у нас на
                        складе также не принимаются. Также на коробе должно присутствовать:</p>
                    <ul>
                        <li>Для типа поставки <b>«короб» штрих-код поставки:</b><br/>
                            С торца каждого короба штрих-код поставки и штрих-код короба. ВНИМАНИЕ! Если у Вас штрих-код
                            напечатан на термоэтикетке, проследите, чтобы термоэтикетка не была заклеена сверху скотчем,
                            так как это может привести к потере информации на термоэтикетке. С той же стороны короба
                            должен присутствовать упаковочный лист, на котором должна быть следующая информация:
                            <ol>
                                <li>Номер короба;</li>
                                <li>Количество коробов в поставке;</li>
                                <li>Номер поставки;</li>
                                <li>Количество товара в коробе;</li>
                                <li>Склад назначения (прим. Екатеринбург – Испытателей);</li>
                                <li>Тип поставки;</li>
                                <li>Наименование юр. лица;</li>
                                <li>Дата поставки;</li>
                                <li>Моно-короб или микс-короб (об этом написано выше).</li>
                            </ol>
                        </li>
                        <li>
                            Для типа поставки <b>«короб» при QR-поставке:</b> <br/>
                            С торца каждого короба QR-код. ВНИМАНИЕ! Если у Вас штрих-код напечатан на термоэтикетке,
                            проследите, чтобы термоэтикетка не была заклеена сверху скотчем, так как это может привести к потере информации на термоэтикетке. С той же стороны короба должен присутствовать упаковочный лист, на котором должна быть следующая информация:
                            <ol>
                                <li>Номер короба;</li>
                                <li>Количество коробов в поставке;</li>
                                <li>Количество товара в коробе ;</li>
                                <li>Склад назначения (прим. Екатеринбург – Испытателей);</li>
                                <li>Наименование юр. лица;</li>
                                <li>Дата поставки;</li>
                                <li>Моно короб или микс короб (об этом написано выше).</li>
                            </ol>
                        </li>
                        <li>Если на коробе не указано даты поставки на склад или указана дата несовпадающаяя с планом поставок на сайте <a href="https://ivlev-ff.ru/">https://ivlev-ff.ru</a>, то поставка будет отправлена на ближайшую дату по расписанию фулфилмента</li>
                        <li>
                            Для типа поставки<b> «монопаллет»:</b> <br/>
                            Товар должен находиться на паллете по правилам маркетплейса. Если Вы привозите груз,
                            оформленный поставкой «монопаллет» не на паллете, то обязательно при наличии нескольких
                            артикулов необходимо отметить на каждом коробе порядковый номер артикула и передать
                            кладовщику упаковочный лист и штрих-кода. Высота паллета допускается от 50 сантиметров до
                            190 сантиметров с учётом поддона.
                        </li>
                        <li>
                            Для поставки <b>на маркетплейс «Ozon»:</b> <br/>
                            С торца каждого короба должен быть лист поставки из личного кабинета. В нём уже содержится
                            информация по юр. лицу и складу. На коробе необходимо указать <b>только дату поставки.</b>
                        </li>
                    </ul>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Передача груза на фулфилмент в городе Самара</p>
                    <p>Наш склад находится по адресу: улица Ближняя дом 3 корпус 3.</p>

                    <p>С Заводского шоссе поворачиваем на улицу Ближняя, проезжаем вглубь улицы, по левую сторону
                        находятся открытые чёрные ворота, заезжаем в ворота и сразу поворачиваем направо. Объезжаем
                        здание и проезжаем до конца здания слева. Находим эстакаду с фиолетово-розовой вывеской
                        «Фулфилмент Алексея Ивлева».</p>
                    <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', margin: 15}}>
                        <img src={regulations_4} style={{width: '30%'}} alt="Рассчитать стоимость"/>
                    </div>

                    <p>Передать груз необходимо любому сотруднику нашего склада. В случае, если Вы пользуетесь услугой
                        курьеров, необходимо в комментарии курьеру подробно прописать схему проезда и предоставить
                        курьеру наш рабочий номер телефона: <b style={{textDecoration: 'underline'}}>89171486688</b>.</p>
                    <p>По всем вопросам Вы можете обратиться в наш офис, который находится в здании напротив нашего
                        склада на втором этаже, офис № 5</p>
                    <span>График работы склада:
                        <ul>
                            <li>ПН-ПТ: с 9:00-17:00</li>
                            <li>СБ-ВС: с 9:00-14:00</li>
                        </ul>
                    </span>
                    <span>График работы офиса:
                        <ul>
                            <li>ПН-ПТ: с 9:00-17:00</li>
                        </ul>
                    </span>
                    <p>Если Вы пользуетесь услугой «забор груза» нашим транспортным средством, то Ваш груз заберет наш
                        водитель в день приёмки товара в период с 9:00-14:00. Водитель обязательно позвонит Вам за 40
                        минут до своего приезда, чтобы Вы смогли подготовить груз к отправке. Ожидание водителя на
                        адресе составляет 15 минут. В случае, если водитель не смог до Вас дозвониться за 40 минут
                        до приезда на адрес, чуть позже, он попробует позвонить Вам ещё раз. Если водитель со второго
                        раза не дозвонился до клиента, этот адрес удаляется из его маршрутного листа, при этом в счёт
                        будет включена стоимость забора.</p>
                    <p>Если Вам нужна помощь при погрузке, Вы можете договориться об этом с водителем напрямую. Оплата
                        за погрузку осуществляется непосредственно водителю по Вашей с ним договорённости.</p>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Передача груза на фулфилмент в городе
                        Тольятти</p>
                    <p>Наш склад находится по адресу: улица Коммунальная дом 24 строение 1.</p>
                    <p>Заезд производится через шлагбаум с правой стороны складской площадки. Для того, чтобы охрана
                        Вас пропустила, необходимо сообщить, что Вы являетесь клиентом «Фулфилмента Алексея Ивлева».
                        После проезда через шлагбаум сразу поворачиваем направо, вторая эстакада слева.</p>
                    <p>Передать груз необходимо любому сотруднику нашего склада. В случае, если Вы пользуетесь услугой
                        курьеров, необходимо в комментарии курьеру подробно прописать схему проезда и предоставить
                        курьеру наш рабочий номер телефона: <b style={{textDecoration: 'underline'}}>89171486688</b>.</p>
                    <span>График работы склада:
                        <ul>
                            <li>ПН: с 9:00-12:00</li>
                            <li>ЧТ: с 9:00-12:00</li>
                        </ul>
                    </span>

                    <span><b>&nbsp;По понедельникам</b> мы забираем груз, предназначенный для городов: Казань (вторник), Тула (четверг),
                        Электросталь (четверг), Подольск (четверг), Коледино (четверг), Санкт-Петербург (суббота),
                        Краснодар (пятница), Адыгейск (суббота), Екатеринбург (пятница).</span>
                    <span><b>&nbsp;По четвергам</b> мы забираем груз, предназначенный для городов: Казань (пятница), Тула (воскресенье),
                        Коледино (воскресенье), Электросталь (воскресенье), Чехов 1,2 (воскресенье), Софьино (воскресенье),
                        Хоругвино (воскресенье) Пушкино 1,2 (воскресенье), Невинномысск (понедельник), Ростов-на-Дону
                        (понедельник), Новосибирск (четверг).</span>

                    <p>Если Вы пользуетесь услугой «забор груза» нашим транспортным средством, то Ваш груз заберет наш
                        водитель <b>в день приёмки</b> товара в период с 9:00-14:00. Водитель обязательно позвонит Вам за 40
                        минут до своего приезда, чтобы Вы смогли подготовить груз к отправке. Ожидание водителя на
                        адресе составляет 15 минут. В случае, если водитель не смог до Вас дозвониться за 40 минут до
                        приезда на адрес, чуть позже, он попробует позвонить Вам ещё раз. Если водитель со второго раза
                        не дозвонился до клиента, этот адрес удаляется из его маршрутного листа, при этом в счёт будет
                        включена стоимость забора.</p>

                    <p>В городе Тольятти помощь в погрузке <span style={{textDecoration: 'underline'}}>водителем не осуществляется.</span></p>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Доставка до склада маркетплейса</p>
                    <p>После того, как Вы успешно передали груз на склад нашего фулфилмента, отслеживайте информацию в
                        нашем телеграмм-канале <a href="https://t.me/wbdostavkasamara">https://t.me/wbdostavkasamara</a> .</p>
                    <span>В нём мы выложим всю информацию по данным водителей, в случае каких-либо изменений мы сразу же
                        оповестим Вас. Данные водителя обязательно будут выложены в период с даты приёма по дату сдачи
                        на склад маркетплейса. Если у Вас возникнут какие-либо вопросы, Вы можете написать нам в телеграмм:&nbsp;
                        <a href="tg://resolve?domain=Ivlevff">@Ivlevff</a> или позвонить по номеру телефона 89171486688.</span>
                    <p>В день приёма груза мы отправим Вам счёт для оплаты в телеграмм по номеру телефона, который Вы
                        указывали в заявке. Этот счёт должен быть оплачен строго до 22:00 этого же дня, ответным
                        сообщением должен быть выслан чек об оплате.</p>
                    <span>В день сдачи груза на склад маркетплейса необходимо проверить Вашу поставку в личном кабинете
                        на наличие ошибок, обязательно быть на связи по номеру телефона, который Вы указывали в заявке.
                        Это нужно для того, чтобы мы могли с Вами оперативно связаться в случае возникновения каких-либо
                        ошибок или в случае отказа приёма груза маркетплейсом.</span>
                    <p>Если мы не сможем (в случае ошибки) с Вами связаться, то груз будет возвращён в город отправки
                        (Самара) или будет передан нашим партнёрам в городе назначения, что непременно приведёт к
                        дополнительным расходам.</p>
                    <span>Если при сдаче груза на склад маркетплейса возникает какая-либо ошибка, мы Вам об этом сообщим
                        и после её устранения будем повторно сдавать поставку. В случае, если ошибку невозможно
                        устранить, мы предложим Вам несколько вариантов, для решения данной ситуации (возврат в Самару,
                        передача партнёрам на ближайший фулфилмент и т.д.)</span>
                    <p>Когда поставки будут успешно сданы, мы сразу же оповестим об этом в нашем телеграмм-канале:&nbsp;
                        <a href="https://t.me/wbdostavkasamara">https://t.me/wbdostavkasamara</a></p>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Информация по отделу упаковки</p>
                    <p>Если Вы хотите перед отправкой груза воспользоваться нашей услугой упаковки товара, Вы можете
                        связаться с руководителем отдела упаковки через телеграмм&nbsp;
                        <a href="tg://resolve?domain=Ivlevff">@Ivlevff</a>. Связь будет поддерживаться по графику
                        работы офиса (ПН-ПТ: 9:00-17:00).</p>
                    <span>Упаковка производится только на складе в городе Самара. Если Вы находитесь в Тольятти, Вы можете
                        передать свой товар на упаковку в дни сбора груза в Тольятти.</span>
                    <p>График отгрузки обговаривается после того, как товар будет доставлен на склад на упаковку.</p>
                    <span>Если вы хотите уточнить или согласовать цену упаковки, Вы можете связаться с нами через
                        телеграмм <a href="tg://resolve?domain=Ivlevff">@Ivlevff</a>. Для согласования цены необходимо
                        описать вид товара, его количество, техническое задание, наличие или отсутствие собственных
                        материалов для упаковки товара.
                    </span>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Способы оплаты</p>
                    <p>Для физических лиц:
                        <ul>
                            <li>
                                При самостоятельной доставке коробов на наш склад
                                <ol>
                                    <li>Оплата наличными в офисе</li>
                                    <li>Оплата картой в офисе</li>
                                </ol>
                            </li>
                            <li>
                                При оформлении забора нашими силами, а также доставке коробов на наш склад сторонними организациями
                                <ol>
                                    <li>СБП при оформлении заявки</li>
                                    <li>Банковская карта при оформлении заявки</li>
                                </ol>
                            </li>
                        </ul>
                    </p>
                    <p>
                        Для юридических лиц и ИП:
                        <ol>
                            <li>Безналичный расчет</li>
                        </ol>
                    </p>

                    <p style={{textAlign: "center", textDecoration: 'underline'}}>Условия возврата</p>
                    <p>На основании договора-оферты, возврат денежных средств за неоказанную услугу не осуществляется.</p>
                </div>
        </div>
    )
}

export default Regulations;
// export default Regulations;
