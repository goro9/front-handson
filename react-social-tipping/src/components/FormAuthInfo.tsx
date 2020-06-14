import React from 'react';


interface FormAuthInfoPropsInterface {
  onClickHandler: (event: any, email: string, password: string, nickName: string) => void;
}

interface FormAuthInfoStateInterface {
  email: string;
  password: string;
  nickName: string;
}

export default class FormAuthInfo extends React.Component<
  FormAuthInfoPropsInterface,
  FormAuthInfoStateInterface
> {
  constructor(props: FormAuthInfoPropsInterface) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nickName: "",
    };
    this.onChangeEmailHandler = this.onChangeEmailHandler.bind(this)
    this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this)
    this.onChangeNickNameHandler = this.onChangeNickNameHandler.bind(this)
  }

  onChangeEmailHandler(event: any) {
    this.setState({
      email: event.target.value
    });
  }

  onChangePasswordHandler(event: any) {
    this.setState({
      password: event.target.value
    });
  }

  onChangeNickNameHandler(event: any) {
    this.setState({
      nickName: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={(event) => this.props.onClickHandler(event, this.state.email, this.state.password, this.state.nickName)}>
          <div className="form-group">
            <label className="col-sm-2 col-form-label">email</label>
            <div className="col-sm-10">
              <input
                name="email"
                type="text"
                className="form-control"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChangeEmailHandler}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 col-form-label">password</label>
            <div className="col-sm-10">
              <input
                name="password"
                type="text"
                className="form-control"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChangePasswordHandler}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 col-form-label">nick name</label>
            <div className="col-sm-10">
              <input
                name="nick name"
                type="text"
                className="form-control"
                placeholder="nick name"
                value={this.state.nickName}
                onChange={this.onChangeNickNameHandler}
              />
            </div>
          </div>
          <div className="mx-auto">
            <button
              type="submit"
              className="btn btn-primary"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
