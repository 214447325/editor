import * as React from "react";

import { HemisphericLight } from "babylonjs";

import { Inspector } from "../../inspector";

import { InspectorColor } from "../../../gui/inspector/fields/color";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorVector3 } from "../../../gui/inspector/fields/vector3";
import { InspectorColorPicker } from "../../../gui/inspector/fields/color-picker";

import { INodeInspectorState } from "../node-inspector";

import { LightInspector } from "./light-inspector";

export class HemisphericLightInspector extends LightInspector<HemisphericLight, INodeInspectorState> {
    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {super.renderContent()}

                {/*//@ts-ignore*/}
                <InspectorSection title="Hemispheric Light">
                    {/*//@ts-ignore*/}
                    <InspectorVector3 object={this.selectedObject} property="direction" label="Direction" step={0.01} />

                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.selectedObject} property="groundColor" label="Ground Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.selectedObject} property="groundColor" label="Hex" />
                </InspectorSection>

                {this.getAnimationRangeInspector()}
                {this.getExcludedMeshesInspector()}
            </>
        );
    }
}

Inspector.RegisterObjectInspector({
    ctor: HemisphericLightInspector,
    ctorNames: ["HemisphericLight"],
    title: "Hemispheric Light",
});
