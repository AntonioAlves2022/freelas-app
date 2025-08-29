import dayjs from 'dayjs'
export const now = ()=> dayjs
export const dateFormat = (dt:Date|string, fmt = 'YYYY-MM-DD HH:mm')=> dayjs(dt).format(fmt)