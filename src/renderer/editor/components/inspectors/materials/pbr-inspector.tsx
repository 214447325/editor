import * as React from "react";

import { PBRMaterial } from "babylonjs";

import { Inspector, IObjectInspectorProps } from "../../inspector";

import { InspectorList } from "../../../gui/inspector/fields/list";
import { InspectorColor } from "../../../gui/inspector/fields/color";
import { InspectorNumber } from "../../../gui/inspector/fields/number";
import { InspectorBoolean } from "../../../gui/inspector/fields/boolean";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorVector2 } from "../../../gui/inspector/fields/vector2";
import { InspectorColorPicker } from "../../../gui/inspector/fields/color-picker";

import { IMaterialInspectorState, MaterialInspector } from "./material-inspector";

export interface IPBRMaterialInspectorState extends IMaterialInspectorState {
    /**
     * Defines wether or not the material is using the metallic workflow.
     */
    useMetallic: boolean;
    /**
     * Defines wether or not the material is using the roughness workflow.
     */
    useRoughness: boolean;
    /**
     * Defines wether or not clear coat is enabled.
     */
    clearCoatEnabled: boolean;
    /**
     * Defines wether or not anisotropy is enabled.
     */
    anisotropyEnabled: boolean;
    /**
     * Defines wether or not sheen is enabled.
     */
    sheenEnabled: boolean;
    /**
     * Defines wether or not roughness is used by sheen.
     */
    useSheenRoughness: boolean;
    /**
     * Defines wether or not sub surface translucency is enabled.
     */
    subSurfaceTranslucencyEnabled: boolean;
    /**
     * Defines wether or not sub surface refaction is enabled.
     */
    subSurfaceRefractionEnabled: boolean;
    /**
     * Defines wether or not iridescence is enabled.
     */
    useIridescence: boolean;
}

export class PBRMaterialInspector extends MaterialInspector<PBRMaterial, IPBRMaterialInspectorState> {
    /**
     * Constructor.
     * @param props defines the component's props.
     */
    public constructor(props: IObjectInspectorProps) {
        super(props);

        this.state = {
            useMetallic: (this.material.metallic ?? null) !== null,
            useRoughness: (this.material.roughness ?? null) !== null,
            clearCoatEnabled: this.material.clearCoat.isEnabled,
            anisotropyEnabled: this.material.anisotropy.isEnabled,
            sheenEnabled: this.material.sheen.isEnabled,
            useIridescence: this.material.iridescence.isEnabled,
            useSheenRoughness: (this.material.sheen.roughness ?? null) !== null,
            subSurfaceTranslucencyEnabled: this.material.subSurface.isTranslucencyEnabled,
            subSurfaceRefractionEnabled: this.material.subSurface.isRefractionEnabled,
        };
    }

    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {super.renderContent()}
                {this.getMaterialFlagsInspector()}
                {this.getAdvancedOptionsInspector()}

                {this.getMapsInspector()}
                {this.getInspectableValuesInspector()}

                {/*//@ts-ignore*/}
                <InspectorSection title="Options">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="unlit" label="Unlit" defaultValue={false} />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="usePhysicalLightFalloff" label="Use Physical Light Falloff" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="forceIrradianceInFragment" label="Force Irradiance In Fragment" />
                </InspectorSection>
                {/*//@ts-ignore*/}
                <InspectorSection title="Albedo">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useAlphaFromAlbedoTexture" label="Use Alpha From Albedo Texture" />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="albedoColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="albedoColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Bump">
                    {this._getBumpTextureLevelInspector()}
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="invertNormalMapX" label="Invert Normal Map X" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="invertNormalMapY" label="Invert Normal Map Y" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useParallax" label="Use Parallax" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useParallaxOcclusion" label="Use Parallax Occlusion" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="parallaxScaleBias" label="Parallax Scale Bias" step={0.001} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Reflectivity">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="enableSpecularAntiAliasing" label="Enable Specular Anti-Aliasing" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useSpecularOverAlpha" label="Use Specular Over Alpha" />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="reflectivityColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="reflectivityColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Reflection">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="environmentIntensity" label="Environment Intensity" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="reflectionColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="reflectionColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Ambient">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useAmbientInGrayScale" label="Use Ambient In Gray Scale" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useAmbientOcclusionFromMetallicTextureRed" label="Use Ambient Occlusion From Metallic Texture Red" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="ambientTextureStrength" label="Strength" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="ambientColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="ambientColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Micro Surface (Glossiness)">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="microSurface" label="Micro Surface" min={0} max={1} step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useAutoMicroSurfaceFromReflectivityMap" label="Use Auto Micro Surface From Reflectivity Map" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useMicroSurfaceFromReflectivityMapAlpha" label="Use Micro Surface From Reflectivity Map Alpha" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Metallic / Roughness">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useMetallnessFromMetallicTextureBlue" label="Use Metallness From Metallic Texture Blue" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useRoughnessFromMetallicTextureAlpha" label="Use Roughness From Metallic Texture Alpha" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useRoughnessFromMetallicTextureGreen" label="Use Roughness From Metallic Texture Green" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="indexOfRefraction" label="Index Of Refraction" min={1} max={3} step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="metallicF0Factor" label="Metallic F0 Factor" min={0} max={1} step={0.01} />
                    {this._getMetallicWorkflowInspector()}
                    {this._getRoughnessWorkflowInspector()}
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Emissive">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="emissiveColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="emissiveColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="BRDF">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.brdf} property="useEnergyConservation" label="Use Energy Conservation" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.brdf} property="useSpecularGlossinessInputEnergyConservation" label="Use Specular Glossiness Input Energy Conservation" />
                </InspectorSection>

                {this._getClearCoatInspector()}
                {this._getIridescenceInspector()}
                {this._getAnisotropyInspector()}
                {this._getSheenInspector()}
                {this._getSubSurfaceInspector()}
            </>
        );
    }

    /**
     * Returns the inspector used to set the textures of the standard material.
     */
    protected getMapsInspector(): React.ReactNode {
        return (
            //@ts-ignore
            <InspectorSection title="Maps">
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="albedoTexture" label="Albedo Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="bumpTexture" label="Bump Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="reflectivityTexture" label="Reflectivity Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="reflectionTexture" label="Reflection Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="ambientTexture" label="Ambient Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="microSurfaceTexture" label="Micro Surface Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="metallicTexture" label="Metallic Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="opacityTexture" label="Opacity Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="emissiveTexture" label="Emissive Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="lightmapTexture" label="Lightmap Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to control the bump texture strength/level.
     */
    private _getBumpTextureLevelInspector(): React.ReactNode {
        return this.material.bumpTexture ? (
            //@ts-ignore
            <InspectorNumber object={this.material.bumpTexture} property="level" label="Strength" step={0.01} />
        ) : undefined;
    }

    /**
     * Returns the metallic workflow inspector used to configure the metallic properties of the
     * PBR material.
     */
    private _getMetallicWorkflowInspector(): React.ReactNode {
        if (!this.state.useMetallic) {
            return (
                //@ts-ignore
                <InspectorSection title="Metallic">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.state} property="useMetallic" label="Use Metallic" onChange={(v) => {
                        this.material.metallic = 0;
                        this.setState({ useMetallic: v });
                    }} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Metallic">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.state} property="useMetallic" label="Use Metallic" onChange={(v) => {
                    this.material.metallic = null;
                    this.setState({ useMetallic: v });
                }} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material} property="metallic" label="Metallic" min={0} max={1} step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the roughness workflow inspector used to configure the roughness properties of the
     * PBR material.
     */
    private _getRoughnessWorkflowInspector(): React.ReactNode {
        if (!this.state.useRoughness) {
            return (
                //@ts-ignore
                <InspectorSection title="Roughness">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.state} property="useRoughness" label="Use Roughness" onChange={(v) => {
                        this.material.roughness = 0;
                        this.setState({ useRoughness: v });
                    }} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Roughness">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.state} property="useRoughness" label="Use Roughness" onChange={(v) => {
                    this.material.roughness = null;
                    this.setState({ useRoughness: v });
                }} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material} property="roughness" label="Roughness" min={0} max={1} step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the clear coat inspector used to configure the clear coat values
     * of the PBR material.
     */
    private _getClearCoatInspector(): React.ReactNode {
        if (!this.state.clearCoatEnabled) {
            return (
                //@ts-ignore
                <InspectorSection title="Clear Coat">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.clearCoat} property="isEnabled" label="Enabled" onChange={(v) => this.setState({ clearCoatEnabled: v })} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Clear Coat">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.material.clearCoat} property="isEnabled" label="Enabled" onChange={(v) => this.setState({ clearCoatEnabled: v })} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.clearCoat} property="intensity" label="Intensity" step={0.01} />
                {/*//@ts-ignore */}
                <InspectorNumber object={this.material.clearCoat} property="roughness" label="Roughness" step={0.01} />
                {/*//@ts-ignore */}
                <InspectorNumber object={this.material.clearCoat} property="indexOfRefraction" label="Index Of Refraction" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorSection title="Textures">
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.material.clearCoat} property="texture" label="Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.material.clearCoat} property="bumpTexture" label="Bump Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Tint">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.clearCoat} property="isTintEnabled" label="Enabled" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material.clearCoat} property="tintColorAtDistance" label="Color At Distance" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material.clearCoat} property="tintThickness" label="Thickness" step={0.01} />
                </InspectorSection>
            </InspectorSection>
        );
    }

    /**
     * Returns the anisotropy inspector used to configure the anisotropy values
     * of the PBR material.
     */
    private _getAnisotropyInspector(): React.ReactNode {
        if (!this.state.anisotropyEnabled) {
            return (
                //@ts-ignore
                <InspectorSection title="Anisotropy">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.anisotropy} property="isEnabled" label="Enabled" onChange={(v) => this.setState({ anisotropyEnabled: v })} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Anisotropy">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.material.anisotropy} property="isEnabled" label="Enabled" onChange={(v) => this.setState({ anisotropyEnabled: v })} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material.anisotropy} property="texture" label="Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.anisotropy} property="intensity" label="Intensity" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorVector2 object={this.material.anisotropy} property="direction" label="Direction" step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the sheen inspector used to configure the sheen values
     * of the PBR material.
     */
    private _getSheenInspector(): React.ReactNode {
        if (!this.state.sheenEnabled) {
            return (
                //@ts-ignore
                <InspectorSection title="Sheen">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.sheen} property="isEnabled" label="Enabled" onChange={(v) => this.setState({ sheenEnabled: v })} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Sheen">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.material.sheen} property="isEnabled" label="Enabled" onChange={(v) => this.setState({ sheenEnabled: v })} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material.sheen} property="texture" label="Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.material.sheen} property="linkSheenWithAlbedo" label="Link Sheen With Albedo" />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.material.sheen} property="albedoScaling" label="Albedo Scaling" />
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.material.sheen} property="useRoughnessFromMainTexture" label="Use Roughness From Main Texture" />

                {this._getSheenRoughnessInspector()}
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.sheen} property="intensity" label="Intensity" step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorColor object={this.material.sheen} property="color" label="Color" step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the roughness inspector to edit the roughness values of the sheen
     * PBR material.
     */
    private _getSheenRoughnessInspector(): React.ReactNode {
        if (!this.state.useSheenRoughness) {
            return (
                //@ts-ignore
                <InspectorSection title="Roughness">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.state} property="useSheenRoughness" label="Enabled" onChange={(v) => {
                        this.material.sheen.roughness = 0;
                        this.setState({ useSheenRoughness: v });
                    }} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Roughness">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.state} property="useSheenRoughness" label="Enabled" onChange={(v) => {
                    this.material.sheen.roughness = null;
                    this.setState({ useSheenRoughness: v });
                }} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material.sheen} property="textureRoughness" label="Roughness" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.sheen} property="roughness" label="Roughness" step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to 
     */
    private _getSubSurfaceInspector(): React.ReactNode {
        const translucencyInspector = this._getSubSurfaceTranslucencyInspector();
        const refractionInspector = this._getSubSurfaceRefractionInspector();

        if (this.state.subSurfaceTranslucencyEnabled || this.state.subSurfaceRefractionEnabled) {
            return (
                //@ts-ignore
                <InspectorSection title="Sub Surface">
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.material.subSurface} property="thicknessTexture" label="Thickness Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.material.subSurface} property="refractionTexture" label="Refraction Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material.subSurface} property="tintColor" label="Tint Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material.subSurface} property="tintColor" label="Hex Color" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material.subSurface} property="useMaskFromThicknessTexture" label="Use Mask From Thickness Texture" />

                    {translucencyInspector}
                    {refractionInspector}
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Sub Surface">
                {translucencyInspector}
                {refractionInspector}
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to configure the sub surface translucency propeties
     * of the PBR material.
     */
    private _getSubSurfaceTranslucencyInspector(): React.ReactNode {
        if (!this.state.subSurfaceTranslucencyEnabled) {
            return (
                //@ts-ignore
                <InspectorSection title="Translucency">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.state} property="subSurfaceTranslucencyEnabled" label="Enabled" onChange={(v) => {
                        this.material.subSurface.isTranslucencyEnabled = true;
                        this.setState({ subSurfaceTranslucencyEnabled: v });
                    }} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Translucency">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.state} property="subSurfaceTranslucencyEnabled" label="Enabled" onChange={(v) => {
                    this.material.subSurface.isTranslucencyEnabled = false;
                    this.setState({ subSurfaceTranslucencyEnabled: v });
                }} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.subSurface} property="translucencyIntensity" label="Intensity" step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to configure the sub surface refraction properties
     * of the PBR material.
     */
    private _getSubSurfaceRefractionInspector(): React.ReactNode {
        if (!this.state.subSurfaceRefractionEnabled) {
            return (
                //@ts-ignore
                <InspectorSection title="Refraction">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.state} property="subSurfaceRefractionEnabled" label="Enabled" onChange={(v) => {
                        this.material.subSurface.isRefractionEnabled = true;
                        this.setState({ subSurfaceRefractionEnabled: v });
                    }} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Refraction">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.state} property="subSurfaceRefractionEnabled" label="Enabled" onChange={(v) => {
                    this.material.subSurface.isRefractionEnabled = false;
                    this.setState({ subSurfaceRefractionEnabled: v });
                }} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.subSurface} property="indexOfRefraction" label="Index Of Refraction" step={0.01} />
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to configure the iridescence properties of the PBR material.
     */
    private _getIridescenceInspector(): React.ReactNode {
        if (!this.state.useIridescence) {
            return (
                //@ts-ignore
                <InspectorSection title="Iridescence">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.state} property="useIridescence" label="Enabled" onChange={(v) => {
                        this.material.iridescence.isEnabled = true;
                        this.setState({ useIridescence: v });
                    }} />
                </InspectorSection>
            );
        }

        return (
            //@ts-ignore
            <InspectorSection title="Iridescence">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={this.state} property="useIridescence" label="Enabled" onChange={(v) => {
                    this.material.iridescence.isEnabled = false;
                    this.setState({ useIridescence: v });
                }} />

                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.iridescence} property="intensity" label="Intensity" min={0} max={10} step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.iridescence} property="indexOfRefraction" label="Index Of Refraction" min={0} max={10} step={0.01} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.iridescence} property="minimumThickness" label="Minimum Thickness" min={0} step={1} />
                {/*//@ts-ignore*/}
                <InspectorNumber object={this.material.iridescence} property="maximumThickness" label="Maximum Thickness" min={0} step={1} />
            </InspectorSection>
        );
    }
}

Inspector.RegisterObjectInspector({
    ctor: PBRMaterialInspector,
    ctorNames: ["PBRMaterial"],
    title: "PBR",
    isSupported: (o) => MaterialInspector.IsObjectSupported(o, PBRMaterial),
});
