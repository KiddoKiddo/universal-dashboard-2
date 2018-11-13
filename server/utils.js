module.exports = {
  getRateLimiterMilliseconds(rate, rateUnit) {
    let inMilliseconds;
    switch (rateUnit) {
      case 's':
        inMilliseconds = 1000; break;
      case 'm':
        inMilliseconds = 60000; break;
      case 'h':
        inMilliseconds = 3600000; break;
      default:
        inMilliseconds = 1; break;
    }
    return inMilliseconds * rate;
  },
};
