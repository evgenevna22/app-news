import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Article} from "../article/Article";

class News extends Component {
    state = {
        counter: 0
    };
    //пример создания счетчика
    handleCounter = (e) => {
        e.preventDefault();
        let {counter} = this.state;
        ++counter;
        this.setState({ counter: counter });
    };
    renderNews = () => {
        const { data } = this.props; // аналогично записи const data = this.props.data, тут наш массив новостей, наши данные
        let newsTemplate = null;

        if (data.length) {
            //проверяем, если новости есть, то мы бежим по массиву новостей (data) и формируем новый массив с id и самой новостью (data)
            newsTemplate = data.map((item) => {
                return <Article key={item.id} data={item} />
            });
        } else {
            newsTemplate = <p>Новостей нет</p>;
        }
        return newsTemplate;
    };
    render () {
        const { data } = this.props;
        const { counter } = this.state; // вытащили counter

        return (
            <section className="news">
                {this.renderNews()}
                {
                    data.length ?
                        <p onClick={this.handleCounter}>Total news is <strong>{data.length}</strong></p>
                        : null
                }
              <p>Counter of meaningless clicks: {counter}</p>
            </section>
        )
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired // PropTypes (с большой буквы) = библиотека prop-types
};

export {News};