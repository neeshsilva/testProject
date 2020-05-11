import React, { Component } from "react";
import { connect } from "react-redux";

const withUser = WrappedComponent => {
  class WithCurrentUser extends Component {
    getCurrentUserId = () => {
      let userId =
        this.props.user && this.props.user.user && this.props.user.user._id;
      return userId;
    };

    render() {
      let currentUserId = this.getCurrentUserId();
      return <WrappedComponent {...this.props} withUser_id={currentUserId} />;
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.login.user
    };
  };

  return connect(
    mapStateToProps,
    {}
  )(WithCurrentUser);
};

export default withUser;
