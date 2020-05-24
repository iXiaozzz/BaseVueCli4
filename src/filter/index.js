import Vue from 'vue'
import * as filters from './filter'

// 实例化Vue的filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});