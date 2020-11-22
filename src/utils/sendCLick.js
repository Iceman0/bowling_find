import React from 'react'
import { GoogleSpreadsheet } from "google-spreadsheet";
import auth from './auth.json';
import Link from "@vkontakte/vkui/dist/es6/components/Link/Link";

function makeIntoLink(link) {
    if (link.match(/^[a-zA-Z0-9]+(.com)/) && link.indexOf('https') === -1) {
        //link.replace(link, "<a href=\"http://www." + link+ "\">" + link + "<\/a>"); <-- OLD
        link = "https://" + link; // <-- NEW
    }
    return link;
}

export const btnSendClick = (name, setFindResult, setColumns, setLoading, myValue) => {

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
            setLoading(false);
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
                if (!name) {
                    return item;
                }
                let find = false;
                if (myValue === undefined) {
                    for (let i in item) {
                        if (typeof item[i] === 'string' && item[i].toLowerCase().indexOf(name) > -1) {
                            find = true;
                            break;
                        }
                    }
                }
                else {
                    if (name)
                        switch (name) {
                            case 'lines_max':
                                if (item['lines']) {
                                    if (parseInt(myValue) >= parseInt(item['lines'])) {
                                        find = true;
                                    }
                                }
                                break;
                            case 'lines_min':
                                if (item['lines']) {
                                    if (parseInt(myValue) <= parseInt(item['lines'])) {
                                        find = true;
                                    }
                                }
                                break;
                            case 'price2':
                                if (item[name]) {
                                    if (parseInt(myValue) >= parseInt(item['price2'])) {
                                        find = true;
                                    }
                                }
                                break;
                            case 'price1':
                                if (item[name]) {
                                    if (parseInt(myValue) <= parseInt(item['price1'])) {
                                        find = true;
                                    }
                                }
                                break;
                            default:
                                if (item[name]) {
                                    if (item[name].toLowerCase().indexOf(myValue) > -1) {
                                        find = true;
                                    }
                                }
                                break;
                        }
                }
                if (find) {
                    return item;
                }
            });
            for(let i = 0; i<columns.length; i++) {
                if (columns[i] === 'link_vk') { debugger;
                    columns[i] = {
                        title: columns[i],
                        dataIndex: columns[i],
                        key: columns[i],
                        render: text => <Link href={makeIntoLink(text)} target="_blank">{text}</Link>,
                    }
                } else columns[i] = {
                    title: columns[i],
                    dataIndex: columns[i],
                    key: columns[i]
                }
            }
            setLoading(false);
            setColumns(columns);
            setFindResult(dataSource);
        })
        .catch((error) => {
            setLoading(false);
            console.error(error)
        });
    //alert(JSON.stringify({name: name, surname: surname, team: team, count: count}));
};
