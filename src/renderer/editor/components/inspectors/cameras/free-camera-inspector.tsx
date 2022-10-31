import * as React from "react";

import { FreeCamera, UniversalCamera } from "babylonjs";

import { Inspector } from "../../inspector";

import { InspectorNumber } from "../../../gui/inspector/fields/number";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorVector3 } from "../../../gui/inspector/fields/vector3";
import { InspectorBoolean } from "../../../gui/inspector/fields/boolean";
import { InspectorKeyMapButton } from "../../../gui/inspector/fields/keymap-button";

import { undoRedo } from "../../../tools/undo-redo";

import { INodeInspectorState } from "../node-inspector";

import { CameraInspector } from "./camera-inspector";

export class FreeCameraInspector extends CameraInspector<FreeCamera | UniversalCamera, INodeInspectorState> {
    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {super.renderContent()}

                {/*//@ts-ignore*/}
                <InspectorSection title="Free Camera">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject} property="speed" label="Speed" min={0} step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject} property="angularSensibility" label="Angular Sensibility" min={0} step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.selectedObject} property="noRotationConstraint" label="No Rotation Constraint" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Transforms">
                    {/*//@ts-ignore*/}
                    <InspectorVector3 object={this.selectedObject} property="position" label="Position" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorVector3 object={this.selectedObject} property="rotation" label="Rotation" step={0.01} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Collisions">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.selectedObject} property="checkCollisions" label="Check Collisions" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.selectedObject} property="applyGravity" label="Apply Gravity" />
                    {/*//@ts-ignore*/}
                    <InspectorVector3 object={this.selectedObject} property="ellipsoid" label="Ellipsoid" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorVector3 object={this.selectedObject} property="ellipsoidOffset" label="Ellipsoid Offset" step={0.01} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Keys">
                    {this._getKeyMapButtonInspector("keysUp", "Forward")}
                    {this._getKeyMapButtonInspector("keysDown", "Backward")}
                    {this._getKeyMapButtonInspector("keysLeft", "Left")}
                    {this._getKeyMapButtonInspector("keysRight", "Right")}
                </InspectorSection>

                {this.getAnimationRangeInspector()}
            </>
        );
    }

    /**
     * Returns the inspector used to configure the keymap of the given property for
     * the current camera.
     */
    private _getKeyMapButtonInspector(property: string, label: string): React.ReactNode {
        const value = this.selectedObject[property][0];
        const o = { value };

        return (
            //@ts-ignore
            <InspectorKeyMapButton object={o} property="value" label={label} onChange={(c) => {
                undoRedo.push({
                    description: `Changed key for camera "${property}" from "${value}" to "${c}"`,
                    common: () => this.forceUpdate(),
                    undo:() => this.selectedObject[property] = [value],
                    redo: () => this.selectedObject[property] = [c],
                });
            }} />
        );
    }
}

Inspector.RegisterObjectInspector({
    ctor: FreeCameraInspector,
    ctorNames: ["FreeCamera", "UniversalCamera", "EditorCamera"],
    title: "Free Camera",
});
