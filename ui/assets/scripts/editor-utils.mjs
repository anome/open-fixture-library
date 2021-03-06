import uuidV4 from 'uuid/v4.js';

/**
 * @returns {!object} An empty fixture object.
 */
export function getEmptyFixture() {
  return {
    key: `[new]`,
    useExistingManufacturer: true,
    manufacturerShortName: ``,
    newManufacturerName: ``,
    newManufacturerShortName: ``,
    newManufacturerWebsite: ``,
    newManufacturerComment: ``,
    newManufacturerRdmId: null,
    name: ``,
    shortName: ``,
    categories: [],
    comment: ``,
    manualURL: ``,
    rdmModelId: null,
    rdmSoftwareVersion: ``,
    physical: getEmptyPhysical(),
    modes: [getEmptyMode()],
    metaAuthor: ``,
    metaGithubUsername: ``,
    availableChannels: {}
  };
}


/**
 * @returns {!object} An empty fixture's or mode's physical object.
 */
export function getEmptyPhysical() {
  return {
    dimensions: null,
    weight: null,
    power: null,
    DMXconnector: ``,
    DMXconnectorNew: ``,
    bulb: {
      type: ``,
      colorTemperature: null,
      lumens: null
    },
    lens: {
      name: ``,
      degreesMinMax: null
    },
    focus: {
      type: ``,
      typeNew: ``,
      panMax: null,
      tiltMax: null
    }
  };
}


/**
 * @returns {!object} An empty mode object.
 */
export function getEmptyMode() {
  return {
    uuid: uuidV4(),
    name: ``,
    shortName: ``,
    rdmPersonalityIndex: null,
    enablePhysicalOverride: false,
    physical: getEmptyPhysical(),
    channels: []
  };
}


/**
 * @returns {!object} An empty channel object.
 */
export function getEmptyChannel() {
  return {
    uuid: uuidV4(),
    editMode: ``,
    modeId: ``,
    name: ``,
    type: ``,
    color: ``,
    fineness: 0,
    defaultValue: null,
    highlightValue: null,
    invert: null,
    constant: null,
    crossfade: null,
    precedence: ``,
    capFineness: 0,
    wizard: {
      show: false,
      start: 0,
      width: 10,
      count: 3,
      templateName: `Function #`
    },
    capabilities: [getEmptyCapability()]
  };
}


/**
 * @param {!string} coarseChannelId The UUID of the coarse channel.
 * @param {!number} fineness The fineness of the newly created fine channel.
 * @returns {!object} An empty fine channel object for the given coarse channel.
 */
export function getEmptyFineChannel(coarseChannelId, fineness) {
  return {
    uuid: uuidV4(),
    coarseChannelId: coarseChannelId,
    fineness: fineness
  };
}


/**
 * @returns {!object} An empty capability object.
 */
export function getEmptyCapability() {
  return {
    uuid: uuidV4(),
    range: null,
    name: ``,
    color: ``,
    color2: ``
  };
}


/**
 * @param {!object} channel The channel object.
 * @returns {!boolean} False if the channel object is still empty / unchanged, true otherwise.
 */
export function isChannelChanged(channel) {
  return Object.keys(channel).some(prop => {
    if ([`uuid`, `editMode`, `modeId`, `wizard`].includes(prop)) {
      return false;
    }

    if ([`defaultValue`, `highlightValue`, `invert`, `constant`, `crossfade`].includes(prop)) {
      return channel[prop] !== null;
    }

    if (prop === `fineness` || prop === `capFineness`) {
      return channel[prop] !== 0;
    }

    if (prop === `capabilities`) {
      return channel.capabilities.some(isCapabilityChanged);
    }

    return channel[prop] !== ``;
  });
}


/**
 * @param {!object} cap The capability object.
 * @returns {!boolean} False if the capability object is still empty / unchanged, true otherwise.
 */
export function isCapabilityChanged(cap) {
  return Object.keys(cap).some(prop => {
    if (prop === `uuid`) {
      return false;
    }

    if (prop === `range`) {
      return cap.range !== null;
    }

    return cap[prop] !== ``;
  });
}


/**
 * @param {!object} channel The channel object that shall be sanitized.
 * @returns {!object} A clone of the channel object without properties that are just relevant for displaying it in the channel dialog.
 */
export function getSanitizedChannel(channel) {
  const retChannel = clone(channel);
  delete retChannel.editMode;
  delete retChannel.modeId;
  delete retChannel.wizard;

  return retChannel;
}


/**
 * @param {*} obj The object / array / ... to clone. Note: only JSON-stringifiable objects / properties are cloneable, i.e. no functions.
 * @returns {*} A deep clone.
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
