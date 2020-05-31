<template>
<div id="dates">
    <select name="year" v-model="year" v-on:change="modify">
        <option v-for="year in getYears()" name="year" :value="year" v-bind:key="year">{{ year }}</option>
    </select>
    <label>年</label>
  
    <select name="month"  v-model="month" v-on:change="modify">
        <option v-for="month in months" name="month" :value="month" v-bind:key="month">{{ month }}</option>
    </select>
    <label>月</label>
  
    <select name="date"  v-model="date" >
        <option v-for="date in getDates(year, month)" name="date" :value="date" v-bind:key="date">{{ date }}</option>
    </select>
    <label>日</label>
</div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Dates',
    // el: '#dates',
    data: function () {
        return {
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            year: moment().year(),
            month: moment().month() + 1,
            date: moment().date()
        }
    },
    methods: {
        getYears: function () {
            const goBackYears = 10;
            const currentYear = moment().year();
            const startYear = currentYear - goBackYears;
            return [...Array(goBackYears + 1).keys()].map(x => x + startYear);
        },
        getDates: function (year, month) {
            const maxDate = this.getFinalDate(year, month);
            return [...Array(maxDate).keys()].map(x => x + 1);
        },
        modify: function () {
            // 年や月が変更されたとき、日が存在しなくなる場合があるので調整する。
            // 例: 2018-12-31 を選択していて月が 12 から 2 に変更された場合、日を 28 にする。
            if (!moment([this.year, this.month - 1, this.date]).isValid()) {
                this.date = this.getFinalDate(this.year, this.month);
            }
        },
        getFinalDate: function (year, month) {
            // 月末日
            return moment([year, month - 1]).endOf('month').date();
        }
    }
}
</script>