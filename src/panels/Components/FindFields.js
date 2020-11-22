import React, {useState, useEffect} from 'react';
import {FormLayout, FormLayoutGroup, Input, Snackbar, Icon24Favorite} from '@vkontakte/vkui/';
import Select from "@vkontakte/vkui/dist/es6/components/Select/Select";

const FindFields = ({ inputValue, setInputValue, selectValue, setSelectValue }) => {

    return (
        <FormLayoutGroup top="Поиск по полю">
            <Select placeholder="Выберите поле для поиска" value={selectValue} onChange={e => {
                setSelectValue(e.target.value);
                setInputValue('');
            }} >
                <option value="name">Название</option>
                <option value="metro">Метро</option>
                <option value="price2">Максимальная цена</option>
                <option value="price1">Минимальная цена</option>
                <option value="lines_min">Минимальное кол-во дорожек</option>
                <option value="lines_max">Максимальное кол-во дорожек</option>
            </Select>
            {(selectValue) ? <Input type="text" value={inputValue} placeholder="Введите необходимые слова" onChange={e => setInputValue(e.target.value)}/> : ''}
        </FormLayoutGroup>
    );
};

export default FindFields;