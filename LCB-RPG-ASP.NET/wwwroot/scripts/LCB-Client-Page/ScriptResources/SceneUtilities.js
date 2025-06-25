export var SceneUtilities;
(function (SceneUtilities) {
    /**
     * * Sets the target's horizontal position as a percentage of the source's viewport width.
     * @param scene
     * @param target
     * @param percentage
     */
    function SetLateralAsPercent(scene, target, percentage) {
        target.position.x = (percentage / 100) * scene.WorldUnitsLaterally;
    }
    SceneUtilities.SetLateralAsPercent = SetLateralAsPercent;
    /**
     * Sets the target's vertical position as a percentage of the source's viewport height.
     * @param scene
     * @param target
     * @param percentage
     */
    function SetHeightAsPercent(scene, target, percentage) {
        target.position.y = (percentage / 100) * scene.WorldUnitsVertically;
    }
    SceneUtilities.SetHeightAsPercent = SetHeightAsPercent;
    function ReturnLateralAsPercent(scene, percentage) {
        return ((percentage / 100) * scene.WorldUnitsLaterally);
    }
    SceneUtilities.ReturnLateralAsPercent = ReturnLateralAsPercent;
    function ReturnHeightAsPercent(scene, percentage) {
        return ((percentage / 100) * scene.WorldUnitsVertically);
    }
    SceneUtilities.ReturnHeightAsPercent = ReturnHeightAsPercent;
})(SceneUtilities || (SceneUtilities = {}));
//# sourceMappingURL=SceneUtilities.js.map