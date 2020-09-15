import * as THREE from 'three';

import { agentRadius, initialAgentPosition } from '../constants';
import {
  getAgent,
  getCamera,
  getCameraBallJoint,
  getScene
} from './gameObjectsStore';
import { quaternion } from '../helpers';

// FIXME: debug:
window.THREE = THREE;

import throttle from 'lodash/throttle';


class ControlEventsHandler {
  info = {
    gravityMultiplier: 0,
  }

  cameraBallJointRotationFlags = {
    left: false,
    right: false,
    up: false,
    down: false,
    rollUp: false,
    rollDown: false
  }
  pushFlags = {
    up: false,
    down: false,
    left: false,
    right: false,
  }
  actionFlags = {
    toggleGravity: false,
    punch: false,
    punchControlsActive: false,
    showPunchControls: false,
    hidePunchControls: false,
  }

  camera = null

  updateInfo() {
    return;
    // DEBUG:
    this.info = {
      ...this.info,
      // cameraBallJointRotationFlags: this.cameraBallJointRotationFlags,
      // cameraBallJointRotationQuaternion: this.cameraBallJointRotationQuaternion,
      // cameraBallJointMovementFlags: this.cameraBallJointMovementFlags,
    };
    this.showInfo();
  }

  init({ showInfo }) {

    this.showInfo = showInfo;
    
    window.addEventListener( 'keydown', ( event ) => {
      switch ( event.keyCode ) {
        case 32:// space
          if (!event.repeat) {
            this.actionFlags.showPunchControls = true;
            this.actionFlags.punchControlsActive = true;
          }
          break;
        case 71 && !event.repeat://g
          this.actionFlags.toggleGravity = !this.actionFlags.toggleGravity;
          break;
        case 65://a
          this.cameraBallJointRotationFlags.left = true;
          break;
        case 68://d
          this.cameraBallJointRotationFlags.right = true;
          break;
        case 87://w
          this.cameraBallJointRotationFlags.up = true;
          break;
        case 83://s
          this.cameraBallJointRotationFlags.down = true;
          break;
        case 81://q
          this.cameraBallJointRotationFlags.rollUp = true;
          break;
        case 69://e
          this.cameraBallJointRotationFlags.rollDown = true;
          break;
        case 38://up
          this.pushFlags.up = true;
          break;
        case 40://down
          this.pushFlags.down = true;
          break;
        case 37://left
          this.pushFlags.left = true;
          break;
        case 39://right
          this.pushFlags.right = true;
          break;
      }
      this.updateInfo();
    }, false);
    

    window.addEventListener( 'keyup', ( event ) => {
      switch ( event.keyCode ) {
        case 32:// space
          this.actionFlags.hidePunchControls = true;
          this.actionFlags.punchControlsActive = false;
          this.actionFlags.punch = true;
          break;
        case 65://a
          this.cameraBallJointRotationFlags.left = false;
          break;
        case 68://d
          this.cameraBallJointRotationFlags.right = false;
          break;
        case 87://w
          this.cameraBallJointRotationFlags.up = false;
          break;
        case 83://s
          this.cameraBallJointRotationFlags.down = false;
          break;
        case 81://q
          this.cameraBallJointRotationFlags.rollUp = false;
          break;
        case 69://e
          this.cameraBallJointRotationFlags.rollDown = false;
          break;
      }
      this.updateInfo();
    }, false );
  }
};

const controlEventsHandlerInstance = new ControlEventsHandler();

export default controlEventsHandlerInstance;
