;;(function($){
	const DouBanHome = {
		init: function() {
			this.go2Page();
			this.hideRubbishMessage();
			this.filterMessageByPeople();
		},
		// 新增跳转到对应页码
		go2Page: function() {
			$(`<input type="text" class="go-to-page" />`).appendTo('.paginator').on('keyup', function(e) {
				const value = $.trim(e.currentTarget.value);
				if (e.keyCode === 13 && value && !isNaN(parseInt(value))) {
					location.href = `?p=${value}`;
				}
			});
		},
		// 新增按人员过滤信息
		filterMessageByPeople: function() {
			const FILTER_PEOPLE_KEY_NAME = 'FILTER_PEOPLE_KEY_NAME';
			const fiterValue = localStorage.getItem(FILTER_PEOPLE_KEY_NAME) || '';
			const $filterSelect = $(`<select class="filter-name-list form-select form-select-sm"><option selected value="">全部</option></select>`).on('change', function(e) {
				const uid = e.currentTarget.value;
				localStorage.setItem(FILTER_PEOPLE_KEY_NAME, uid);
				$('.stream-items >.new-status').each(function() {
					const $element = $(this);
					(!uid || uid == $element.data('uid')) ? $element.show() : $element.hide();
				});
			});
			const data = _.uniqBy($('.stream-items >.new-status').map(function() {
				return ({
					uid: $(this).data('uid'),
					name: $(this).find('>.status-item >.mod >.hd >.text >.lnk-people').text()
				})
			}).get(), 'uid');
			data.forEach(function ({ uid, name }) {
				$(`<option value="${uid}">${name}</option>`).appendTo($filterSelect);
			});
			console.log(data);
			$filterSelect.insertAfter('#db-isay');
			if (!!data.find((_, ({ uid }) => uid == fiterValue))) {
				$filterSelect.val(fiterValue).trigger('change');
			}
		},
		hideRubbishMessage: function() {
			// 屏蔽左侧相关信息
			[
				'#fp-sites',
				'.notify-mod',
				'#anony-time',
				'#dale_homepage_login_top_right',
				'#dale_homepage_login_bottom_right',
				'#dale_homepage_login_inner_middle',
				'#dale_homepage_login_download_middle',
				'#dale_homepage_login_bottom_middle_right'
			].forEach((selector) => $(selector).hide());
		}
	};

	$(function(){
		DouBanHome.init();
	});
})(jQuery);