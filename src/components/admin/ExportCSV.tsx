import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Orders} from "../../models/Orders";

interface ExportCSVProps {
    csvData: any[],
    fileName: string
}

export const ExportCSV: React.FC<ExportCSVProps> = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData: Orders[], fileName: string) => {
        const transformedData = csvData.map(order => {
            let boxesString = "";
            let amount = 0;

            if (!order.boxes) return;
            for (let box of order.boxes) {
                boxesString += `${box.length}/${box.height}/${box.width}-${box.amount}\n`;
                amount += box.amount;
            }

            const { person, status1c, boxes, ...rest } = order as any;

            return {
                ...rest,
                boxesString,
                boxesAmount: amount,
                email: person?.email,
            };
        })
        const ws = XLSX.utils.json_to_sheet(transformedData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <button className="change_password_button" style={{marginBottom: 30, padding: 20}}
                onClick={() => exportToCSV(csvData, fileName)}>Выгрузить все заказы</button>
    )
}