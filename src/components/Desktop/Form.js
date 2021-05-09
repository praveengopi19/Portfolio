import { Component } from 'react';
import { connect } from 'react-redux';
import { handleInput } from '../../Redux/Actions/actionCreator';
import { history } from '../../Redux/Actions/actionCreator';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            section: false,
            indexofhistory: history.length,
            optionalInput: ''
        };

    }


    handleSubmit(e) {


        this.setState({ section: true });
        this.props.setInput(this.state.input);
        e.preventDefault();
        // console.log(this.state.childeren);
    }

    handleChangeInput(e) {
        // console.log(history);
        this.setState({ input: e.target.value, optionalInput: e.target.value });
        //console.log(this.state.input);
    }

    upkeyEvent(e) {

        if (e.keyCode == '38') /* eslint eqeqeq: 0 */ {
            // up arrow
            if (this.state.indexofhistory > 0 && history.length >= this.state.indexofhistory) {
                //console.log(this.state.indexofhistory);
                this.setState({ input: history[this.state.indexofhistory - 1] });
                this.setState({ indexofhistory: this.state.indexofhistory - 1 });
            }
            // if (this.state.indexofhistory <= 0) {
            //   this.setState({ indexofhistory: 0 });
            // }

        }
        else if (e.keyCode == '40') /* eslint eqeqeq: 0 */ {
            // down arrow
            if (this.state.indexofhistory < history.length - 1) {
                //console.log(this.state.indexofhistory);
                this.setState({ input: history[this.state.indexofhistory + 1] });
                this.setState({ indexofhistory: this.state.indexofhistory + 1 });
            }
            else if (this.state.optionalInput !== this.state.input) {
                this.setState({ input: this.state.optionalInput })
            }
        }
    }

    render() {
        return (
            <div >
                <form onSubmit={(e) => this.handleSubmit(e)} >
                    <label htmlFor="listinput">
                        <div className="parent">Praveen-Kumar-G</div><div style={{ display: "inline" }}>:</div>{this.props.direcotry ? <div className="directory">~/{this.props.direcotry}</div> : ""}<div style={{ display: "inline" }}>$</div>
                    </label>
                    <input value={this.state.input} onChange={(e) => this.handleChangeInput(e)} disabled={(this.state.section) ? "disabled" : ""} autoFocus spellCheck="false" onKeyDown={(e) => this.upkeyEvent(e)} />

                </form>
            </div >

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setInput: input => dispatch(handleInput(input))
});


export default connect(null, mapDispatchToProps)(Form);