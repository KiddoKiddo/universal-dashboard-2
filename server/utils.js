module.exports = {
  getRateLimiterMilliseconds(rate, rateUnit) {
    let inMilliseconds;
    switch (rateUnit) {
      case 's':
        inMilliseconds = 1000; break;
      case 'm':
        inMilliseconds = 1000; break;
      default:
        inMilliseconds = 1; break;
    }
    return inMilliseconds * rate;
  },
};
