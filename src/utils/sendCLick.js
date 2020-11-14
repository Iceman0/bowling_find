import bridge from '@vkontakte/vk-bridge';
//import * from jQuery;
import { GoogleSpreadsheet } from "google-spreadsheet";
import auth from './auth.json';

export const btnSendClick = (name, setFindResult, setColumns) => {

// Config variables
    const SPREADSHEET_ID = auth.SPREADSHEET_ID;
    const SHEET_ID = auth.SHEET_ID;
    const CLIENT_EMAIL = auth.client_email;
    const PRIVATE_KEY = auth.private_key;

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            })
            // loads document properties and worksheets
            await doc.loadInfo();

            const sheet = doc.sheetsById["443542541"];
            const result = await sheet.getRows();
            return(result);
        } catch (e) {
            console.error('Error: ', e);
            return([]);
        }
    };

    const newRow = { Name: name};

    appendSpreadsheet(newRow)
        .then((value) => {
            let columns = (value.length) ? value[0]._sheet.headerValues : [];

            let dataSource = value.map(item => {
                let result = Object.assign({}, item);
                for(let i in result) {
                    if (i[0] === '_') delete result[i];
                }
                if (result.id) result.key = result.id;
                return result;
            }).filter(item => {
                if (!name) return item;
                let find = false;
                for (let i in item) {
                    if (typeof item[i] === 'string' && item[i].indexOf(name) > -1) {
                        find = true;
                        break;
                    }
                }
                if (find) return item;
            });
            for(let i = 0; i<columns.length; i++) {
                columns[i] = {
                    title: columns[i],
                    dataIndex: columns[i],
                    key: columns[i]
                }
            }
            setColumns(columns);
            setFindResult(dataSource);
        })
        .catch((error) => console.error(error));
    //alert(JSON.stringify({name: name, surname: surname, team: team, count: count}));
};
