import * as React from "react";

import { Scene, DepthOfFieldEffectBlurLevel, ImageProcessingConfiguration } from "babylonjs";

import { Inspector, IObjectInspectorProps } from "../../inspector";

import { InspectorList } from "../../../gui/inspector/fields/list";
import { InspectorColor } from "../../../gui/inspector/fields/color";
import { InspectorNumber } from "../../../gui/inspector/fields/number";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorBoolean } from "../../../gui/inspector/fields/boolean";
import { InspectorVector2 } from "../../../gui/inspector/fields/vector2";

import { SceneSettings } from "../../../scene/settings";

import { AbstractInspector } from "../abstract-inspector";

export interface IRendererInspectorState {
    /**
     * Defines wether or not SSAO 2 is enabled.
     */
    ssao2Enabled: boolean;
    /**
     * Defines wether or not Motion Blur is enabled.
     */
    motionBlurEnabled: boolean;
    /**
     * Defines wether or not SSR is enabled.
     */
    ssrEnabled: boolean;
    /**
     * Defines the configuration of the default pipleine.
     */
    default: {
        /**
         * Defines wether or not the default rendering pipleine is enabled.
         */
        enabled: boolean;
        /**
         * Defines wether or not image processing is enabled.
         */
        imageProcessingEnabled: boolean;
        /**
         * Defines wether or not bloom is enabled
         */
        bloomEnabled: boolean;
        /**
         * Defines wether or not sharpen is enabled.
         */
        sharpenEnabled: boolean;
        /**
         * Defines wether or not DOF is enabled.
         */
        depthOfFieldEnabled: boolean;
        /**
         * Defines wether or not Chromatic Aberration is enabled.
         */
        chromaticAberrationEnabled: boolean;
        /**
         * Defines wether or not grain is enabled.
         */
        grainEnabled: boolean;
        /**
         * Defines wether or not glow is enabled.
         */
        glowEnabled: boolean;
        /**
         * Defines wether or not vignette is enabled.
         */
        vignetteEnabled: boolean;
    };
}

export class RenderingInspector extends AbstractInspector<Scene, IRendererInspectorState> {
    /**
     * Constructor.
     * @param props defines the component's props.
     */
    public constructor(props: IObjectInspectorProps) {
        super(props);

        this.state = {
            ssao2Enabled: SceneSettings.IsSSAOEnabled(),
            motionBlurEnabled: SceneSettings.IsMotionBlurEnabled(),
            ssrEnabled: SceneSettings.IsScreenSpaceReflectionsEnabled(),
            default: this._getDefaultState(),
        };
    }

    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {this._getSSAO2Inspector()}
                {this._getMotionBlurInspector()}
                {this._getSSRInspector()}
                {this._getDefaultInspector()}
            </>
        );
    }

    /**
     * Returns the SSAO2 inspector used to configure the SSAO 2 post-process.
     */
    private _getSSAO2Inspector(): React.ReactNode {
        {/*//@ts-ignore*/}
        const enable = <InspectorBoolean object={this.state} property="ssao2Enabled" label="Enabled" onChange={(v) => {
            SceneSettings.SetSSAOEnabled(this.editor, this.state.ssao2Enabled);
            this.setState({ ssao2Enabled: v });
        }} />

        if (!this.state.ssao2Enabled || !SceneSettings.SSAOPipeline) {
            return (
                //@ts-ignore
                <InspectorSection title="SSAO 2">
                    {enable}
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="SSAO 2">
                {enable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.SSAOPipeline} property="radius" label="Radius" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.SSAOPipeline} property="totalStrength" label="Strength" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.SSAOPipeline} property="samples" label="Samples" step={1} min={1} max={32} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.SSAOPipeline} property="maxZ" label="Max Z" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={SceneSettings.SSAOPipeline} property="expensiveBlur" label="Expansive Blur" />
            </InspectorSection>
        );
    }

    /**
     * Returns the Motion Blur inspector used to configure the Motion Blur post-process.
     */
    private _getMotionBlurInspector(): React.ReactNode {
        {/*//@ts-ignore*/}
        const enable = <InspectorBoolean object={this.state} property="motionBlurEnabled" label="Enabled" onChange={(v) => {
            SceneSettings.SetMotionBlurEnabled(this.editor, this.state.motionBlurEnabled);
            this.setState({ motionBlurEnabled: v });
        }} />

        if (!this.state.motionBlurEnabled || !SceneSettings.MotionBlurPostProcess) {
            return (
                //@ts-ignore
                <InspectorSection title="Motion Blur">
                    {enable}
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Motion Blur">
                {enable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.MotionBlurPostProcess} property="motionStrength" label="Strength" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.MotionBlurPostProcess} property="motionBlurSamples" label="Samples" step={1} min={1} max={64} />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={SceneSettings.MotionBlurPostProcess} property="isObjectBased" label="Object Based" />
            </InspectorSection>
        );
    }

    /**
     * Returns the SSE inspector used to configure the Screen-Space-Reflections post-process.
     */
    private _getSSRInspector(): React.ReactNode {
        {/*//@ts-ignore*/}
        const enable = <InspectorBoolean object={this.state} property="ssrEnabled" label="Enabled" onChange={(v) => {
            SceneSettings.SetScreenSpaceReflectionsEnabled(this.editor, this.state.ssrEnabled);
            this.setState({ ssrEnabled: v });
        }} />

        if (!this.state.ssrEnabled || !SceneSettings.ScreenSpaceReflectionsPostProcess) {
            return (
                //@ts-ignore
                <InspectorSection title="Screen Space Reflections">
                    {enable}
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Screen Space Reflections">
                {enable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="strength" label="Strength" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="threshold" label="Threshold" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="step" label="Step" step={0.001} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="reflectionSpecularFalloffExponent" label="Specular Exponent" step={0.001} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="reflectionSamples" label="Samples" step={1} min={1} max={512} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="roughnessFactor" label="Roughness Factor" step={0.01} min={0} max={10} />
                {/*//@ts-ignore*/}
                <InspectorSection title="Smooth">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="enableSmoothReflections" label="Enable" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={SceneSettings.ScreenSpaceReflectionsPostProcess} property="smoothSteps" label="Steps" step={1} min={0} max={32} />
                </InspectorSection>
            </InspectorSection>
        );
    }

    /**
     * Returns the default inspector used to configure the default rendering pipleline of Babylon.JS.
     */
    private _getDefaultInspector(): React.ReactNode {
        {/*//@ts-ignore*/}
        const enable = <InspectorBoolean object={this.state.default} property="enabled" label="Enabled" onChange={() => {
            SceneSettings.SetDefaultPipelineEnabled(this.editor, this.state.default.enabled);
            this._updateDefaultState();
        }} />

        if (!this.state.default.enabled || !SceneSettings.DefaultPipeline) {
            return (
                //@ts-ignore
                <InspectorSection title="Default Pipeline">
                    {enable}
                </InspectorSection>
            );
        }
        {/*//@ts-ignore*/}
        const imageProcessingEnable = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="imageProcessingEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
        const imageProcessing = this.state.default.imageProcessingEnabled ? (
                //@ts-ignore
            <InspectorSection title="Image Processing">
                {imageProcessingEnable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.imageProcessing} property="exposure" label="Exposure" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.imageProcessing} property="contrast" label="Contrast" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={SceneSettings.DefaultPipeline.imageProcessing} property="toneMappingEnabled" label="Tone Mapping Enabled" />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={SceneSettings.DefaultPipeline.imageProcessing} property="fromLinearSpace" label="From Linear Space" />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Image Processing">
                {imageProcessingEnable}
            </InspectorSection>
        );
        {/*//@ts-ignore*/}
        const bloomEnable = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="bloomEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
        const bloom = this.state.default.bloomEnabled ? (
                //@ts-ignore
            <InspectorSection title="Bloom">
                {bloomEnable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline} property="bloomKernel" label="Kernel" step={1} min={1} max={512} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline} property="bloomWeight" label="Weight" step={0.01} min={0} max={1} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline} property="bloomThreshold" label="Threshold" step={0.01} min={0} max={1} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline} property="bloomScale" label="Scale" step={0.01} min={0} max={1} />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Bloom">
                {bloomEnable}
            </InspectorSection>
        );
        {/*//@ts-ignore*/}
        const sharpenEnable = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="sharpenEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;

        const sharpen = this.state.default.sharpenEnabled ? (
                //@ts-ignore
            <InspectorSection title="Sharpen">
                {sharpenEnable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.sharpen} property="edgeAmount" label="Edge Amount" step={0.01} min={0} max={2} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.sharpen} property="colorAmount" label="Color Amount" step={0.01} min={0} max={2} />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Sharpen">
                {sharpenEnable}
            </InspectorSection>
        );
        {/*//@ts-ignore*/}
        const depthOfFieldEnable = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="depthOfFieldEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
        const depthOfField = this.state.default.depthOfFieldEnabled ? (
                //@ts-ignore
            <InspectorSection title="Depth Of Field">
                {depthOfFieldEnable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.depthOfField} property="focusDistance" label="Focus Distance" step={1} min={0} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.depthOfField} property="fStop" label="F-Stop" step={0.01} min={0} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.depthOfField} property="focalLength" label="Focal Length" step={0.01} min={0} />
                {/*//@ts-ignore*/}
                <InspectorList object={SceneSettings.DefaultPipeline} property="depthOfFieldBlurLevel" label="Blur Level" items={[
                    { label: "Low", data: DepthOfFieldEffectBlurLevel.Low },
                    { label: "Medium", data: DepthOfFieldEffectBlurLevel.Medium },
                    { label: "High", data: DepthOfFieldEffectBlurLevel.High },
                ]} onChange={() => {
                    this.forceUpdate();
                }} />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Depth Of Field">
                {depthOfFieldEnable}
            </InspectorSection>
        );
        {/*//@ts-ignore*/}
        const chromaticAberrationEnable = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="chromaticAberrationEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
        const chromaticAberraction = this.state.default.chromaticAberrationEnabled ? (
                //@ts-ignore
            <InspectorSection title="Chromatic Aberration">
                {chromaticAberrationEnable}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.chromaticAberration} property="aberrationAmount" label="Amount" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.chromaticAberration} property="radialIntensity" label="Radial Intensity" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorVector2 object={SceneSettings.DefaultPipeline.chromaticAberration} property="direction" label="Direction" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorVector2 object={SceneSettings.DefaultPipeline.chromaticAberration} property="centerPosition" label="Center" step={0.01} />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Chromatic Aberration">
                {chromaticAberrationEnable}
            </InspectorSection>
        );
        {/*//@ts-ignore*/}
        const grainEnabled = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="grainEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
        const grain = this.state.default.grainEnabled ? (
                //@ts-ignore
            <InspectorSection title="Grain">
                {grainEnabled}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.grain} property="intensity" label="Intensity" min={0} step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={SceneSettings.DefaultPipeline.grain} property="animated" label="Animated" />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Grain">
                {grainEnabled}
            </InspectorSection>
        );
        {/*//@ts-ignore*/}
        const glowLayerEnabled = <InspectorBoolean object={SceneSettings.DefaultPipeline} property="glowLayerEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
        const glow = this.state.default.glowEnabled ? (
                //@ts-ignore
            <InspectorSection title="Glow Layer">
                {glowLayerEnabled}
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.glowLayer} property="blurKernelSize" label="Blur Kernel Size" min={1} max={512} step={1} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={SceneSettings.DefaultPipeline.glowLayer} property="intensity" label="Intensity" min={0} step={0.01} />
            </InspectorSection>
        ) : (
            //@ts-ignore
            <InspectorSection title="Glow Layer">
                {glowLayerEnabled}
            </InspectorSection>
        );

        let vignette: React.ReactNode = null;
        if (SceneSettings.DefaultPipeline.imageProcessingEnabled) {
            {/*//@ts-ignore*/}
            const vignetteEnabled = <InspectorBoolean object={SceneSettings.DefaultPipeline.imageProcessing} property="vignetteEnabled" label="Enabled" onChange={() => this._updateDefaultState()} />;
            vignette = this.state.default.vignetteEnabled ? (
                    //@ts-ignore
                <InspectorSection title="Vignette">
                    {vignetteEnabled}
                    {/*//@ts-ignore*/}
                    <InspectorList object={SceneSettings.DefaultPipeline.imageProcessing} property="vignetteBlendMode" label="Blend Mode" items={[
                        { label: "Multiply", data: ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY },
                        { label: "Opaque", data: ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE },
                    ]} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={SceneSettings.DefaultPipeline.imageProcessing} property="vignetteWeight" label="Weight" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={SceneSettings.DefaultPipeline.imageProcessing} property="vignetteColor" label="Color" step={0.01} />
                </InspectorSection>
            ) : (
                //@ts-ignore
                <InspectorSection title="Vignette">
                    {vignetteEnabled}
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Default Pipeline">
                {enable}
                {/*//@ts-ignore*/}
                <InspectorSection title="Anti Aliasing">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={SceneSettings.DefaultPipeline} property="fxaaEnabled" label="FXAA Enabled" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={SceneSettings.DefaultPipeline} property="samples" label="Samples" step={1} min={1} max={32} />
                </InspectorSection>

                {imageProcessing}
                {bloom}
                {sharpen}
                {depthOfField}
                {chromaticAberraction}
                {vignette}
                {grain}
                {glow}
            </InspectorSection>
        );
    }

    /**
     * Returns the new state of the default pipeline.
     */
    private _getDefaultState(): IRendererInspectorState["default"] {
        return {
            enabled: SceneSettings.IsDefaultPipelineEnabled(),
            imageProcessingEnabled: SceneSettings.DefaultPipeline?.imageProcessingEnabled ?? false,
            bloomEnabled: SceneSettings.DefaultPipeline?.bloomEnabled ?? false,
            sharpenEnabled: SceneSettings.DefaultPipeline?.sharpenEnabled ?? false,
            depthOfFieldEnabled: SceneSettings.DefaultPipeline?.depthOfFieldEnabled ?? false,
            chromaticAberrationEnabled: SceneSettings.DefaultPipeline?.chromaticAberrationEnabled ?? false,
            grainEnabled: SceneSettings.DefaultPipeline?.grainEnabled ?? false,
            glowEnabled: SceneSettings.DefaultPipeline?.glowLayerEnabled ?? false,
            vignetteEnabled: SceneSettings.DefaultPipeline?.imageProcessing?.vignetteEnabled ?? false,
        }
    }

    /**
     * Updates the default rendering pipeline state.
     */
    private _updateDefaultState(): void {
        this.setState({
            default: {
                ...this.state.default,
                ...this._getDefaultState(),
            },
        });
    }
}

Inspector.RegisterObjectInspector({
    ctor: RenderingInspector,
    ctorNames: ["Scene"],
    title: "Rendering",
});
