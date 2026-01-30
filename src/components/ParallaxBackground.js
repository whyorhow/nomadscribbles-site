import React from "react";
import { skyObjects } from "./Sky";
import { sunsObjects } from "./Suns";
import { waterObjects } from "./Water";
import { soilObjects } from "./Soil";
import { grassObjects } from "./Grass";

const ParallaxBackground = React.memo(({ scrollY, viewportHeight, viewportWidth }) => {
    const renderLayer = (layer, index) => {
        const isMobileBp = viewportWidth <= 640;
        const isTabletBp = viewportWidth > 640 && viewportWidth <= 1024;

        const pick = (mobileVal, tabletVal, desktopVal, fallbackVal) => {
            if (isMobileBp && mobileVal !== undefined) return mobileVal;
            if (isTabletBp && tabletVal !== undefined) return tabletVal;
            if (desktopVal !== undefined) return desktopVal;
            return fallbackVal;
        };

        const width = pick(layer.widthMobile, layer.widthTablet, layer.widthDesktop, layer.width || "100%");
        const speed = pick(layer.speedMobile, layer.speedTablet, layer.speedDesktop, layer.speed ?? 0.05);
        const xSpeed = pick(layer.xSpeedMobile, layer.xSpeedTablet, layer.xSpeedDesktop, layer.xSpeed ?? 0);

        const baseTopPercent = pick(
            layer.baseTopPercentMobile,
            layer.baseTopPercentTablet,
            layer.baseTopPercentDesktop,
            layer.baseTopPercent
        );

        const baseBottomPercent = pick(
            layer.baseBottomPercentMobile,
            layer.baseBottomPercentTablet,
            layer.baseBottomPercentDesktop,
            layer.baseBottomPercent
        );

        const baseLeftPercent = pick(
            layer.baseLeftPercentMobile,
            layer.baseLeftPercentTablet,
            layer.baseLeftPercentDesktop,
            layer.baseLeftPercent || 0
        );

        let parallaxY = 0;
        if (baseTopPercent !== undefined) {
            const basePx = viewportHeight * (baseTopPercent / 100);
            parallaxY = basePx - scrollY * speed * 20;
        } else if (baseBottomPercent !== undefined) {
            const distanceFromBottom = viewportHeight * (baseBottomPercent / 100);
            parallaxY = viewportHeight - distanceFromBottom - scrollY * speed * 20;
        }

        const layerStyle = {
            position: "absolute",
            width,
            height: layer.height || "auto",
            zIndex: layer.zIndex ?? 0,
            top: `${parallaxY}px`,
            left: `${baseLeftPercent}%`,

            pointerEvents: "none",
            maxWidth: "none",
            willChange: "transform, top, left",
            opacity: layer.opacity ?? 1,
        };

        if (layer.centerHorizontally) {
            layerStyle.left = "50%";
            layerStyle.transform = "translateX(-50%)";

            if (xSpeed) {
                const parallaxX = scrollY * (xSpeed * 10);
                layerStyle.transform = `translateX(calc(-50% + ${parallaxX}px))`;
            }

            if (layer.sway) {
                layerStyle.animation = `sway ${layer.swayDuration || 2}s ease-in-out infinite alternate`;
            }
        } else {
            const parallaxX = (baseLeftPercent / 100) * viewportWidth + scrollY * (xSpeed * 20);
            layerStyle.left = `${parallaxX}px`;
        }

        return (
            <svg
                key={layer.id || index}
                viewBox={layer.viewBox || "0 0 800 400"}
                preserveAspectRatio={layer.preserveAspectRatio || "xMidYMid meet"}
                style={layerStyle}
            >
                {layer.path && (
                    <path d={layer.path} fill={layer.fill} stroke={layer.stroke} strokeWidth={layer.strokeWidth} />
                )}
            </svg>
        );
    };

    const sky = skyObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 1 }));
    const suns = sunsObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 10 }));
    const water = waterObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 15 }));
    const soil = soilObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 20 }));
    const grass = grassObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 25 }));

    return (
        <>
            {sky.map(renderLayer)}
            {suns.map(renderLayer)}
            {water.map(renderLayer)}
            {soil.map(renderLayer)}
            {grass.map(renderLayer)}
        </>
    );
});

export default ParallaxBackground;
