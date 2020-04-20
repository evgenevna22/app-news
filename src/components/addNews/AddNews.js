import React from 'react';
import PropTypes from 'prop-types';


class AddNews extends  React.Component {
    state = {
        author: '',
        text: '',
        bigText: '',
        agreement: false
    };

    /*constructor(props) {
        super(props);
        this.input = React.createRef();
    }*/

    /*Принцип прежний: мы находим DOM-узел, считываем его свойство / вызываем его нативный метод, в данном случае - вызываем метод focus(). Обращаться к DOM-элементам напрямую - очень редкая практика в React.
    componentDidMount() {
        this.input.current.focus();
    }*/

    onBtnClickHandler = (e) => {
        e.preventDefault();
        const { author, text, bigText } = this.state;
        //генерация уникальный key в виде id
        this.props.onAddNews({ id: +new Date(), author, text, bigText});
    };

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({ [id]: value })
    };

    handleCheckValue = (e) => {
        this.setState({agreement: e.currentTarget.checked})
    };

    validateForm = () => {
        const { author, text, agreement } = this.state;
        return !(author.trim() && text.trim() && agreement);
    };

    render () {
        const {author, text, bigText} = this.state;

        return (
            <form className="add">
              <legend className="add__title">Добавление новости</legend>
              <input
                  id='author'
                  type="text"
                  className="add__input-author"
                  onChange={this.handleChange}
                  value={author}
                  placeholder='введите имя автора'
              />
              <textarea
                  id='text'
                  className="add__input-text"
                  value={text}
                  onChange={this.handleChange}
                  rows="2"
                  maxLength="20"
                  placeholder='введите текст новости'>
                    </textarea>
              <textarea
                  id='bigText'
                  className="add__input-text"
                  value={bigText}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder='введите текст новости'>
                    </textarea>
              <label>
                <input
                    className='add__checkrule'
                    type="checkbox"
                    onChange={this.handleCheckValue}/>
                I agree with rules
              </label>
              <button
                  onClick={this.onBtnClickHandler}
                  disabled={this.validateForm()}
              >add news
              </button>
            </form>
        )
    }
}

AddNews.propTypes = {
    onAddNews: PropTypes.func.isRequired
};

export {AddNews};