import React from 'react'

export const Loader = () => {
  return (
    <div style={classes.wrapper}>
      <div style={classes.loader}>
        <svg className="filter" version="1.1">
          <defs>
            <filter id="gooeyness">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="gooeyness"
              />
              <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
            </filter>
          </defs>
        </svg>
        <div className="dots">
          <div className="dot mainDot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  )
}

const classes = {
	wrapper: {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		width: '100vw',
		height: '100vh',
		background: 'rgba(0, 0, 0, 0.15',
	},
  loader: {
    position: 'fixed',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '100',
  },
}
