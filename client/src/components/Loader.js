import React from 'react'

export const Loader = () => {
	return(
		<div style={classes.loader}>Loading...</div>
	)
}

const classes = {
	loader: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontSize: '4rem'
	}
}