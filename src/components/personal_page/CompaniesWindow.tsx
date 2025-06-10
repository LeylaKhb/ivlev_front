import React, {useState} from "react";
import CalculatorDropdown from "../calculator/CalculatorDropdown";
import {Person} from "../../models/Person";
import Form from "../forms/Form";
import {Company} from "../../models/Company";

interface CompaniesWindowProps {
    person: Person | undefined;
}

interface DadataResponse {
    suggestions: Array<{
        value: string;
        unrestricted_value: string;
        data: {
            inn: string;
            kpp: string;
            ogrn: string;
            name: {
                full_with_opf: string;
            }
        };
    }>;
}

interface DadataRequestOptions {
    method: string;
    mode: RequestMode;
    headers: {
        "Content-Type": string;
        "Accept": string;
        "Authorization": string;
    };
    body: string;
}

const CompaniesWindow: React.FC<CompaniesWindowProps> = ({person}) => {
    const [inn, setInn] = useState("");
    const [innError, setInnError] = useState("");
    const [name, setName] = useState("");

    function handleInnInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (isNaN(Number(lastChar)) || (lastChar === ' ') || (inputValue.length === 13)) {
            e.target.value = inputValue.slice(0, -1);
            return;
        }

        if (inputValue.length === 10 || inputValue.length === 12) {
            setInn(inputValue);
            setInnError("");
            fetchCompanyByInn(inputValue)
                .then(data => {
                    if (data.suggestions && data.suggestions.length > 0) {

                        const company = data.suggestions[0];
                        setName(company.value);
                        setInnError("");

                        console.log("Найдена компания:", company.value);
                    } else {
                        console.log("Не найдена компания:", data.suggestions.length, inputValue);
                        setInnError("Такая компания не найдена");
                        setName("");
                    }
                })
                .catch(error => {
                    console.error("Ошибка при поиске компании:", error);
                    setInnError("Такая компания не найдена");
                    setName("");
                });
            return;
        }
        setInn(inputValue);
        setInnError("");
    }

    function checkInn() {
        if (!/^\d{10}(\d{2})?$/.test(inn)) {
            setInnError("ИНН должен состоять из 10 или 12 цифр");
            return false;
        }
        return true;
    }

    function addInn() {
        let isInnCorrect = checkInn();
        if (!isInnCorrect || name === "")
            return;

        fetch("https://kodrf.ru/api/companies/add", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(new Company(name, inn))
        })
            .then(() => {
                window.location.assign('https://ivlev-ff.ru/personal_account');
            })

    }

    function handleDeleteCompany(companyInn: string) {
        fetch('https://kodrf.ru/api/companies/delete/' + companyInn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при удалении компании');
                }
                window.location.assign('https://ivlev-ff.ru/personal_account');
            })
    }


    const fetchCompanyByInn = async (inn: string): Promise<DadataResponse> => {
        const url: string = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        const token: string = "215adba17a4ff8aa543cccf6ac57bef95851caa6";

        const options: DadataRequestOptions = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({query: inn})
        };

        try {
            const response: Response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: DadataResponse = await response.json();
            return result;
        } catch (error) {
            console.error("Error fetching company data:", error);
            throw error;
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "60vh"}}>
            <div style={{
                display: person?.companies?.length !== undefined && person?.companies?.length > 0 ? "none" : "flex",
                color: "red", textAlign: "center"
            }}>Добавьте свои компании, чтобы продолжить работу с сайтом
            </div>

            <div className="schedule_form_title">Добавленные компании:</div>
            {person?.companies?.length ? (
                <div className="companies-container">
                    {person.companies.map((company, index) => (
                        <div key={`company-${company.inn}`} className="company-item">
                            <span className="company-number">{index + 1}. </span>
                            <span className="company-name">{company.companyName}</span>
                            <span className="company-inn"> ({company.inn})</span>
                            <a href="#" className="delete-company-link"
                               style={{
                                   marginLeft: '10px', color: 'red', textDecoration: 'none',
                                   display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle'
                               }}
                               onClick={(e) => {
                                   e.preventDefault();
                                   handleDeleteCompany(company.inn);
                               }}
                               title="Удалить компанию"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                                     style={{verticalAlign: 'middle'}}
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0"/>
                                    <path d="M10 11l0 6"/>
                                    <path d="M14 11l0 6"/>
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-companies" style={{marginBottom: 15}}>Нет добавленных компаний</div>
            )}

            <div style={{marginTop: "auto"}}>
                <div className="schedule_form_title">Добавить новую компанию:</div>
                <Form handleInput={handleInnInput} error={innError}
                      text={inn} label="ИНН" name="inn"/>
                <div>{name}</div>
                <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "center"
                }}>
                    <button className="change_password_button" onClick={addInn} disabled={innError !== ""}>Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CompaniesWindow;