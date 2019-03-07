import React from 'react';

import {AddNews} from "./components/addNews/AddNews";
import {News} from "./components/news/News";
//берем файл json без { }

import './App.css'

class App extends React.Component {
    state = {
        news: null, // в начальное состояние положили значение из переменной
        isLoading: false
    };

    static getDerivedStateFromProps(state) {
        let nextFilteredNews;
        // смотрим в state.news и проверяем, чтобы не клонировать null
        // например, в момент первой отрисовки
        if (Array.isArray(state.news)) {
            nextFilteredNews = [...state.news];

            nextFilteredNews.forEach((item) => {
                if (item.bigText.toLowerCase().includes('pubg')) {
                    item.bigText = 'IT IS SPAM!'
                }
            });

            return {
                filteredNews: nextFilteredNews
            }  //обновляем state на основе новых props без лишней перерисовки
        }
        return null;
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('http://localhost:3000/data/newsData.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    this.setState({isLoading: false, news: data});
                }, 3000);
            });
    }

    handleAddNews = data => {
        // сначала мы формируем массив, на основе всего того, что уже было в новостях
        // и кладем это все в новый массив + новую новость кладем в начало массива
        const nextNews = [data, ...this.state.news];
        // затем обновляем новый массив новостей в this.state.news
        this.setState({ news: nextNews})
    };

    render() {
        const {news, isLoading} = this.state;

        return (
            <div className="news-page">
              <h2>Новости</h2>
              <AddNews onAddNews={this.handleAddNews}/> {/* добавили вывод компонента */}
              {
                  isLoading && <p>Загружаю новости...</p>
                  /*проверка, isLoading true или нет*/
              }
              {
                  Array.isArray(news) && <News data={news}/>
              }  {/*мы добавили свойство, этот комментарий превратиться в пустую строку*/}
            </div>
        )
    }
}

export default App