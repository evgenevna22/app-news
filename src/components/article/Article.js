import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
    state = {
        visible: false // определили начальное состояние
    };
    //метод, отвечающий за кнопку подробнее onClick
    //handler - обработчик
    handleReadMoreClick = (e) => {
        e.preventDefault();
        this.setState({ visible: true });
    };

    render() {
        const { author, text, bigText } = this.props.data;
        //когда объявляем переменную с { }, мы уже заходим внутрь объекта и получаем все все его свойства
        const { visible } = this.state;
        /* когда объявляем переменную без { }, то нам надо указать на какое именно св-во мы ссылаемся
        const visible = this.state.visible; */
        //console.log(this); выведется каждая Article {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}

        return (
            <section className="news__item article">
              <cite className="article__author">{author}</cite>
              <p className="article__text">{text}</p>
                {
                    visible ? <p className="article__info">{bigText}</p>
                        : <button className="article__more" onClick={ this.handleReadMoreClick }>Подробнее</button>
                }
            </section>
        )
    }
}

//своего рода валидация всех наших данных, т.е. если стоит isRequired, то в консоли появится логическая ошибка, которую легко отследить
Article.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
};

export { Article }