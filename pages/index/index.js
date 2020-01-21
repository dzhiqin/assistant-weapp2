"use strict";
var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        year: 0,
        month: 0,
        date: ['日', '一', '二', '三', '四', '五', '六'],
        dateArr: [],
        todayStr: '',
        isTodayWeek: false,
        todayIndex: 0,
        btnText: '来啦来啦'
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        var _this = this;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = function (res) {
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        else {
            wx.getUserInfo({
                success: function (res) {
                    app.globalData.userInfo = res.userInfo;
                    _this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = new Date().getDate();
        this.dateInit(year, month);
        this.setData({
            year: year,
            month: month + 1,
            todayStr: '' + year + (month > 10 ? month + 1 : '0' + (month + 1)) + (date < 9 ? '0' + date : date)
        });
    },
    dateInit: function (setYear, setMonth) {
        var _this = this;
        var dateArr = [];
        var arrLen = 0;
        var now = setYear ? new Date(setYear, setMonth) : new Date();
        var year = setYear || now.getFullYear();
        var nextYear = 0;
        var month = setMonth || now.getMonth();
        var nextMonth = (month + 1) > 11 ? 1 : (month + 1);
        var startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();
        var dayNums = new Date(year, nextMonth, 0).getDate();
        var obj = {};
        var num = 0;
        if (month + 1 > 11) {
            nextYear = year + 1;
            dayNums = new Date(nextYear, nextMonth, 0).getDate();
        }
        arrLen = startWeek + dayNums;
        for (var i = 0; i < arrLen; i++) {
            if (i >= startWeek) {
                num = i - startWeek + 1;
                obj = {
                    todayStr: '' + year + (month > 10 ? month + 1 : '0' + (month + 1)) + (num > 9 ? num : '0' + num),
                    dateNum: num,
                    weight: 5
                };
            }
            else {
                obj = {};
            }
            dateArr[i] = obj;
        }
        this.setData({
            dateArr: dateArr
        }, function () {
            _this.rebuildDateArr();
        });
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth() + 1;
        var nowWeek = nowDate.getDay();
        var getYear = setYear || nowYear;
        var getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
        if (nowYear == getYear && nowMonth == getMonth) {
            this.setData({
                isTodayWeek: true,
                todayIndex: nowWeek
            });
        }
        else {
            this.setData({
                isTodayWeek: false,
                todayIndex: -1
            });
        }
    },
    lastMonth: function () {
        var year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
        var month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
        this.setData({
            year: year,
            month: (month + 1)
        });
        this.dateInit(year, month);
    },
    nextMonth: function () {
        var year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
        var month = this.data.month > 11 ? 0 : this.data.month;
        this.setData({
            year: year,
            month: (month + 1)
        });
        this.dateInit(year, month);
    },
    rebuildDateArr: function () {
        var checkedDate = this.getCheckedDate();
        var dateArr = this.data.dateArr.map(function (item) {
            if (item.todayStr) {
                item.isChecked = checkedDate.indexOf(item.todayStr) !== -1;
                return item;
            }
        });
        this.setData({ dateArr: dateArr });
    },
    onClickDate: function () {
        console.log('onClickDate');
    },
    getCheckedDate: function () {
        console.log('getCheckedDate');
        return [
            "20200111",
            "20200112",
            "20200113",
            "20200114",
            "20200115",
            "20200116",
            "20200119"
        ];
    },
    getUserInfo: function (e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
});
