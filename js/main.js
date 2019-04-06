var siteVote = new Vue({
    el: '#main',

	data: {
		datas:[],
		selectedSite: {},
		current: 1,
		tableSize: null,
		dialogVisible: false,
		listByVote: {},
		bus: new Vue()
	},

	created: function() {
        Vue.use(Buefy.default); // Buefy componenti
    },

	mounted: function() {
		// console.log('mounted');
		var refThis = this;

		var keys = Object.keys(localStorage);
		var i = keys.length;
		while (i--) {
			this.datas.push(JSON.parse(localStorage.getItem(keys[i])));
		}
		console.log(this.datas);

		this.bus.$on('New site added', function() {
			refThis.listElements();
		});
	},

	methods: {
		openDialog: function(){
			console.log('openDialog');
			this.dialogVisible = true;
		},

		closeDialog: function() {
            this.dialogVisible = false;
		},

		listElements: function() {
			this.datas = [];
			var newKeys = Object.keys(localStorage);
			var newI = newKeys.length;
			while (newI--) {
				this.datas.push(JSON.parse(localStorage.getItem(newKeys[newI])));
			}
		},

		focusEl: function() {
        	setTimeout(function() {
	        	$('.table-wrapper table').focus();
        	}, 100);	
        },
		
		voteUp: function(siteName, url, voteCount, vote) {
			if(voteCount == 0) {
				vote = null;
			}

			if(vote === null || vote === false ) {
				var updateData = {'siteName':siteName, 'url':url, voteCount: voteCount+1, vote: true}
				localStorage.setItem(siteName, JSON.stringify(updateData));
				this.listElements();
			} else {
				this.$dialog.alert({
                    title: 'Uyarı',
                    message: 'Bir site için sadece bir oy hakkınız vardır.',
                    confirmText: 'Tamam'
                })
			}
		},

		voteDown: function(siteName, url, voteCount, vote) {
			if(voteCount == 0) {
				vote = null;
			}

			if(vote === null || vote === true ) {
				var updateData = {'siteName':siteName, 'url':url, voteCount: voteCount-1, vote: false}
				localStorage.setItem(siteName, JSON.stringify(updateData));
				this.listElements();
			} else {
				this.$dialog.alert({
                    title: 'Uyarı',
                    message: 'Bir site için sadece bir oy hakkınız vardır.',
                    confirmText: 'Tamam'
                })
			}
		}
	}

});