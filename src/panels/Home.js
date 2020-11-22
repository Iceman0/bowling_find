import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {FormLayout, FormLayoutGroup, Input, Snackbar, Icon24Favorite} from '@vkontakte/vkui/';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Spinner from "@vkontakte/vkui/dist/es6/components/Spinner/Spinner";
import bridge from '@vkontakte/vk-bridge';
import {btnSendClick} from './../utils/sendCLick'
import {Row, Col, Table} from 'antd'
import 'antd/dist/antd.css';
import './Home.css';
import FindFields from "./Components/FindFields";

const bufColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const Home = ({ id, go, fetchedUser }) => {

    // const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [findResult, setFindResult] =  useState([]);
    const [columns, setColumns] =  useState(bufColumns);
    const [isLoading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] =  useState("");

    useEffect(() => {
        setLoading(true);
        btnSendClick(name.toLowerCase(), setFindResult, setColumns, setLoading);
    }, []);

    const btnFindClick = (name, value) => {
        setLoading(true);
        btnSendClick(name.toLowerCase(), setFindResult, setColumns, setLoading, value);
    };

    return (<Panel id={id}>
            <PanelHeader>Введите свой результат</PanelHeader>
            {fetchedUser &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}

            <Group title="Navigation Example">
                <Div>
                    <FormLayout className="bowl-Form">
                        <FormLayoutGroup top="Поиск">
                            <Input type="text" value={name} placeholder="Введите необходимые слова" onChange={e => setName(e.target.value)}/>
                        </FormLayoutGroup>
                        <FindFields inputValue={inputValue} setInputValue={setInputValue} selectValue={selectValue} setSelectValue={setSelectValue}/>
                        <Button size="xl" onClick={() => {
                            if (inputValue && selectValue !== '') btnFindClick(selectValue, inputValue); else btnFindClick(name);
                        }}>Найти</Button>
                    </FormLayout>
                    {(findResult && findResult.length > 0) ? (isLoading) ?
                        <div>
                            <Spinner size="large" className='table-spinner' />
                            <Table dataSource={findResult} columns={columns} scroll={{ x: 1500 }} />
                        </div>:
                       <Table dataSource={findResult} columns={columns} scroll={{ x: 1500 }} /> :
                        (isLoading) ? <Spinner size="large" className='table-spinner-short' /> : ''}
                </Div>
            </Group>
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
