export function CheckConfig(
  config,
  setConfigForSave,
  setMessageW,
  setMessageH,
  setMessageR,
  setQm,
  drawIt
) {
  let isUsefull = true;

  if (isNaN(config.height) || isNaN(config.width) || isNaN(config.radius)) {
    return;
  } else {
    if (+config.width < 100 || +config.width > 500) {
      setMessageW("Zulässige Werte: 100 - 500 cm.");
      isUsefull = false;
    } else {
      setMessageW("");
    }
    if (+config.height < 180 || +config.height > 300) {
      setMessageH("Zulässige Werte: 180 - 300 mm.");
      isUsefull = false;
    } else {
      setMessageH("");
    }
    if (
      +config.radius < 0 ||
      +config.radius > +config.width / 2 ||
      +config.radius > +config.height ||
      !config.radius
    ) {
      setMessageR(
        "Zulässige Werte: 0 - 50 % der Breite und 0 - 100 % der Höhe."
      );
      isUsefull = false;
    } else {
      setMessageR("");
    }

    if (isUsefull) {
      setQm(
        ((+config.width * +config.height) / 10000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      );

      setConfigForSave(config);

      drawIt();
    }
  }
}
