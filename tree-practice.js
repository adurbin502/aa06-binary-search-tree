const {
  BinarySearchTree,
  TreeNode,
} = require("./binary-search-tree.js");
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
  if (!rootNode) {
    return null;
  }
  let current = rootNode;
  while (current.left) {
    current = current.left;
  }
  return current.val;
}

function findMaxBST(rootNode) {
  if (!rootNode) {
    return null;
  }
  let current = rootNode;
  while (current.right) {
    current = current.right;
  }
  return current.val;
}

function findMinBT(rootNode) {
  if (!rootNode) {
    return null;
  }
  let min = rootNode.val;
  let leftMin = findMinBT(rootNode.left);
  let rightMin = findMinBT(rootNode.right);

  if (leftMin !== null && leftMin < min) {
    min = leftMin;
  }
  if (rightMin !== null && rightMin < min) {
    min = rightMin;
  }
  return min;
}

function findMaxBT(rootNode) {
  if (!rootNode) {
    return null;
  }
  let max = rootNode.val;
  let leftMax = findMaxBT(rootNode.left);
  let rightMax = findMaxBT(rootNode.right);

  if (leftMax !== null && leftMax > max) {
    max = leftMax;
  }
  if (rightMax !== null && rightMax > max) {
    max = rightMax;
  }
  return max;
}

function getHeight(rootNode) {
  if (!rootNode) {
    return -1;
  }
  let leftHeight = getHeight(rootNode.left);
  let rightHeight = getHeight(rootNode.right);

  return Math.max(leftHeight, rightHeight) + 1;
}

function balancedTree(rootNode) {
  if (!rootNode) {
    return true;
  }
  let leftHeight = getHeight(rootNode.left);
  let rightHeight = getHeight(rootNode.right);
  return (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    balancedTree(rootNode.left) &&
    balancedTree(rootNode.right)
  );
}

function countNodes(rootNode) {
  if (!rootNode) {
    return 0;
  }
  return (
    1 +
    countNodes(rootNode.left) +
    countNodes(rootNode.right)
  );
}

function getParentNode(rootNode, target) {
  if (!rootNode || rootNode.val === target) {
    return null;
  }
  let stack = [];
  let currentNode = rootNode;
  let parent = null;

  while (stack.length > 0 || currentNode) {
    if (currentNode) {
      if (
        currentNode.left &&
        currentNode.left.val === target
      ) {
        return currentNode;
      }
      if (
        currentNode.right &&
        currentNode.right.val === target
      ) {
        return currentNode;
      }
      stack.push(currentNode);
      parent = currentNode;
      currentNode = currentNode.left;
    } else {
      currentNode = stack.pop();
      currentNode = currentNode.right;
    }
  }
  return undefined;
}

function inOrderPredecessor(rootNode, target) {
  let predecessor = null;
  let currentNode = rootNode;

  while (currentNode) {
    if (currentNode.val < target) {
      predecessor = currentNode.val;
      currentNode = currentNode.right;
    } else {
      currentNode = currentNode.left;
    }
  }

  return predecessor;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  // Undefined if the target cannot be found
  // Set target based on parent
  // Case 0: Zero children and no parent:
  //   return null
  // Case 1: Zero children:
  //   Set the parent that points to it to null
  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  // Case 3: One child:
  //   Make the parent point to the child
  let parent = getParentNode(rootNode, target);
  let nodeToDelete;
  if (parent) {
    if (parent.left && parent.left.val === target) {
      nodeToDelete = parent.left;
    } else if (parent.right && parent.right.val === target) {
      nodeToDelete = parent.right;
    }
  } else {
    nodeToDelete = rootNode;
  }
  if (!nodeToDelete) {
    return rootNode;
  }
  if (!nodeToDelete.left && !nodeToDelete.right) {
    if (parent) {
      if (parent.left === nodeToDelete) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else {
      rootNode = null;
    }
  }
  else if (!nodeToDelete.left || !nodeToDelete.right) {
    let child;
    if (nodeToDelete.left) {
      child = nodeToDelete.left;
    } else {
      child = nodeToDelete.right;
    }
    if (parent) {
      if (parent.left === nodeToDelete) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    } else {
      rootNode = child;
    }
  }
  else {
    let predecessorVal = inOrderPredecessor(rootNode, target);
    deleteNodeBST(rootNode, predecessorVal);
    nodeToDelete.val = predecessorVal;
  }
  return undefined;
}

module.exports = {
  findMinBST,
  findMaxBST,
  findMinBT,
  findMaxBT,
  getHeight,
  countNodes,
  balancedTree,
  getParentNode,
  inOrderPredecessor,
  deleteNodeBST,
};
