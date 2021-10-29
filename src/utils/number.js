export default {
  toRupiah: number => {
    return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  },
};
