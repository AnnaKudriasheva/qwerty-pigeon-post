export const loadingPage = function (obj) {
    let loadingText;
    loadingText = obj.add.text(obj.world.centerX, obj.world.centerY,
        'Loading...', { fill: '#484848' });
    loadingText.anchor.setTo(0.5);
    obj.load.setPreloadSprite(loadingText);
};
