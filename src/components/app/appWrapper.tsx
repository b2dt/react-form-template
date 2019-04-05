import {Dispatch, bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import App, {AppPageProps} from './app'

const mapStateToProps = (state: AppPageProps) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({

}, dispatch)

const AppWrapper = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

export default AppWrapper