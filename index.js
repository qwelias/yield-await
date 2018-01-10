module.exports = makeGenerator => {
	return function () {
		const generator = makeGenerator.apply(this, arguments)
		const handle = result => {
			if (result.done) return Promise.resolve(result.value)
			return Promise.resolve(result.value).then(res => {
				return handle(generator.next(res))
			}, err => {
				return handle(generator.throw(err))
			})
		}
		try {
			return handle(generator.next())
		} catch (ex) {
			return Promise.reject(ex)
		}
	}
}
