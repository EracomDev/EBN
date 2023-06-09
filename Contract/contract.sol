// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(address target, bytes memory data, uint256 weiValue, string memory errorMessage) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: weiValue }(data);
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}


/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM
 * instruction `delegatecall`. We refer to the second contract as the _implementation_ behind the proxy, and it has to
 * be specified by overriding the virtual {_implementation} function.
 * 
 * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a
 * different contract through the {_delegate} function.
 * 
 * The success and return data of the delegated call will be returned back to the caller of the proxy.
 */
abstract contract Proxy {
    /**
     * @dev Delegates the current call to `implementation`.
     * 
     * This function does not return to its internall call site, it will return directly to the external caller.
     */
    function _delegate(address implementation) internal {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }

    /**
     * @dev This is a virtual function that should be overriden so it returns the address to which the fallback function
     * and {_fallback} should delegate.
     */
    function _implementation() internal virtual view returns (address);

    /**
     * @dev Delegates the current call to the address returned by `_implementation()`.
     * 
     * This function does not return to its internall call site, it will return directly to the external caller.
     */
    function _fallback() internal {
        _beforeFallback();
        _delegate(_implementation());
    }

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other
     * function in the contract matches the call data.
     */
    fallback () payable external {
        _fallback();
    }

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
     * is empty.
     */
    receive () payable external {
        _fallback();
    }

    /**
     * @dev Hook that is called before falling back to the implementation. Can happen as part of a manual `_fallback`
     * call, or as part of the Solidity `fallback` or `receive` functions.
     * 
     * If overriden should call `super._beforeFallback()`.
     */
    function _beforeFallback() internal virtual {
    }
}
library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IERC20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        // solhint-disable-next-line max-line-length
        require((value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(value);
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(value, "SafeERC20: decreased allowance below zero");
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");
        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}


contract EBN is Proxy {
    
    address public impl;
    address public contractOwner;

    modifier onlyContractOwner() { 
        require(msg.sender == contractOwner); 
        _; 
    }

    constructor(address _impl) public {
        impl = _impl;
        contractOwner = msg.sender;
    }
    
    function update(address newImpl) public onlyContractOwner {
        impl = newImpl;
    }

    function removeOwnership() public onlyContractOwner {
        contractOwner = address(0);
    }
    
    function _implementation() internal override view returns (address) {
        return impl;
    }
}
contract EBNBasic  {

     
    address public impl;
    address public contractOwner;

    using SafeMath for uint;
    IERC20 public depositToken;
     

    struct User {
        uint id;
        uint8 referrer; // change
        uint directs;
        uint256[] referrals;
        uint8 pkg_id;        
        uint256 balance;
        uint256 totalDeposit;
        bool club_royalty_status;
        bool global_club1_status;
        bool global_club2_status;
        uint32 timestamp;
    }

    struct poolTable{
        uint8 id;
        uint8 parentId;
        address myaddress;
        uint8 p1;
        uint8 p2;
        uint8 u_id;
    }
    struct poolLevel{
        uint8 main;
        mapping(uint8=>uint8[]) levelTeam;
    }
    struct income {
        uint256 poolIncome;
        uint256 directIncome;  
        uint256 clubRoyaltyIncome;  
        uint256 Royalty1Income;  
        uint256 Royalty2Income;  
        mapping(uint256=>slotincome) slotIncome;      
    } 
    struct slotincome{
        uint256 total;
        mapping (uint256 => uint256) cycleIncome;
    }

    struct X2 {        
        uint8 totalUsers;
    }
    uint256 baseDiv;
    mapping(uint8 => mapping(uint8=>X2)) public Matrix;

   uint256[] public packages;
     
    
    uint256[] public poolIncome;
    mapping(uint8 => poolTable) public pooltable;
    mapping(uint8 => User) public users; // change
    mapping(uint => address) public idToAddress;
 
    uint8 public total_user;
    uint8 public poolUsers;
    mapping(address => bool) public isUserExists; // change
    mapping(address => uint8) public addressToId; // change
    mapping(uint8 => mapping(uint256 => bool)) public isPackageActive; // change
    mapping(uint8 => mapping(uint8 => uint8)) public currentCycle; // change
    mapping(uint8 => mapping(uint8 => uint8[])) public cycleIds; // change
    mapping(uint8 => mapping(uint8 => mapping(uint8 => poolLevel))) public cycleInfo;
    mapping(uint8 => poolLevel) public poolLevelTeam;
    mapping(uint8 => mapping(uint8 => mapping(uint8 => uint8))) public cycleTotalUser;
    mapping(uint8 => uint8) public poolEntries;
    mapping(uint8 => income) public incomes;
    uint256[] public levelincome;
   
     
}

contract EBNContract is EBNBasic {
    using SafeERC20 for IERC20;
    modifier onlyOwner() { 
        require(msg.sender == contractOwner); 
        _; 
    }


     
    function init(address addr,IERC20 _depositToken) public onlyOwner() {
        
        total_user++;
        
        addressToId[addr]=total_user;
        idToAddress[total_user]=addr;
        users[total_user].id=total_user; // change
        users[total_user].referrer=0;//address(this);   //change      
        users[total_user].timestamp=uint32(block.timestamp);//address(this);   //change      
        isUserExists[addr] = true;
        baseDiv = 100000;
        packages = [0,70e18]; 
        levelincome = [21500,3000,3000,3000,3000];
        poolIncome = [0,558e18,7047e18,76412e18];
        poolEntries[1] = 1;
        poolEntries[2] = 8;
        poolEntries[3] = 10;

        //poolEntries[4] = 10;
        
        // poolIncome[2] = [8e17,16e17,36e17,10e18];
        // poolIncome[3] = [16e17,32e17,72e17,20e18];
        // poolIncome[4] = [32e17,64e17,144e17,40e18];
        // poolIncome[5] = [64e17,128e17,288e17,80e18];
        // poolIncome[6] = [128e17,256e17,576e17,160e18];
        // poolIncome[7] = [256e17,512e17,1152e17,320e18];
        // poolIncome[8] = [512e17,1024e17,2304e17,640e18];
        // poolIncome[9] = [1024e17,2048e17,4608e17,1280e18];
        // poolIncome[10] = [2048e17,4096e17,9216e17,2560e18];
        
        for(uint8 j=1;j<=1;j++){
            poolUsers++;
            pooltable[poolUsers] = poolTable(poolUsers,0,addr,0,0,total_user);
            isPackageActive[total_user][j] = true;
            currentCycle[total_user][j] = 1;
            cycleIds[total_user][j].push(poolUsers);
        }
        
        

        depositToken = IERC20(_depositToken);

    }
    uint8 private x;
    function distributeLevel(uint8 addr,uint256 amnt)internal{
        x = users[addr].referrer;
       uint256 inc;

        for(uint256 i = 0;i < levelincome.length;i++){
             if(x != 0){                 
               // updateUserTrigger(x);
               inc= amnt.mul(levelincome[i]).div(baseDiv);
                users[x].balance += inc; 
                incomes[x].directIncome += inc;                 
                //updateUserTrigger(x);
                   x = users[x].referrer;
             }else{
                 break;
             }              
            //distributeIncome(x,amnt,pkgid);                      
        }        
    }
    function distributeClub(uint8 addr,uint256 amnt)internal{
        x = users[addr].referrer;
       uint256 inc;
        while(x!=0){
        //for(uint256 i = 0;i < levelincome.length;i++){
             //if(x != 0){                 
               // updateUserTrigger(x);
               if(users[x].club_royalty_status==true){
                    inc= amnt.mul(25).div(1000);
                    users[x].balance += inc; 
                    incomes[x].clubRoyaltyIncome += inc;
               }
               // updateUserTrigger(x);
               if(users[x].global_club1_status==true){
                     inc= amnt.mul(25).div(1000);
                    users[x].balance += inc; 
                    incomes[x].Royalty1Income += inc;                 

               }
                //updateUserTrigger(x);
                   x = users[x].referrer;
            //  }else{
            //      break;
            //  }              
            //distributeIncome(x,amnt,pkgid);                      
        }        
    }
    
    function checkactive(uint8 upr,uint8 mtrix) public view returns(uint8){ // change
       uint8 ret=upr; // change
       bool crcy = isPackageActive[upr][mtrix];
       while(crcy==false){
           ret = users[ret].referrer;
           crcy = isPackageActive[upr][mtrix];
       }
       return ret;
    }   
    
    function active_club_royality(uint8 usr)internal{
        if(users[usr].club_royalty_status==false){
            if(users[usr].referrer>=12){
                users[usr].club_royalty_status=true;
                active_royalty1(users[usr].referrer);
            }
        }
    }

    function active_royalty1(uint8 usr)internal{
        if(users[usr].club_royalty_status==true){
            if(users[usr].global_club2_status==true){                
                uint8 dircts;
                uint256 dir;
                for(uint8 i=0;i<users[usr].directs;i++){
                    dir=users[usr].referrals[i];
                    if(users[usr].club_royalty_status==true){
                        dircts++;
                    }
                }
                if(dircts>=12){
                    users[usr].global_club2_status=true;
                }
            }
        }
    }

    function active_royalty2(uint8 usr)internal{
        if(users[usr].global_club2_status==false){
            if(users[usr].referrer>=24){
                users[usr].global_club2_status=true;
            }
        }
    }
     
    function addMem(uint8 usr,uint8 mt)public{
        uint8 prntid = (poolUsers-1)/3;
        uint8 prt = prntid+1;
        poolUsers++;
        pooltable[poolUsers] = poolTable(poolUsers,prt,address(0),0,0,usr);

        isPackageActive[usr][mt] = true;
        currentCycle[usr][mt]++;
        cycleIds[usr][mt].push(poolUsers);
        poolLevelTeam[poolUsers].main = poolUsers;
        distribute(poolUsers,mt);
    }

    
 
    uint8 public sll;
    function distribute_pool(uint8 pr,uint8 lvl)internal{
         
       // pr = pooltable[pr].parentId;

        if(pr!=0){
            uint8 usr = pooltable[pr].u_id;
            uint256 icm = poolIncome[lvl];
            incomes[usr].poolIncome += icm;           
            users[usr].balance +=  icm;
            
        }
   }

   function reentry(uint8 pr,uint8 lvl)internal{
       //sll = 28;
       uint8 user = pooltable[pr].u_id;
       sll = user;
       if(user>0){
            uint8 entries = poolEntries[lvl];
            if(entries>0){
                for(uint8 i=0;i<entries;i++){
                    addMem(user,1);
                }
            }
        }
   }

    function distribute(uint8 prnt,uint8 mt) public{
        uint8 pr = prnt;
        //uint8 curcycle;
        uint8 usr;
        //uint8 ne;
        for(uint8 i = 0;i<10;i++){
            pr = pooltable[pr].parentId;
            usr = pooltable[pr].u_id;
            //curcycle = currentCycle[usr][mt];
            poolLevelTeam[pr].levelTeam[i+1].push(prnt);

            if(pr!=0){

                if(poolLevelTeam[pr].levelTeam[i+1].length>=27 && i==2){
                    sll = 27;
                    reentry(pr,1);                    
                    distribute_pool(pr,1);
                }
                if(poolLevelTeam[pr].levelTeam[i+1].length>=729 && i==5){
                    reentry(pr,2);                    
                    distribute_pool(pr,2);
                }
                if(poolLevelTeam[pr].levelTeam[i+1].length>=19683 && i==8){
                    reentry(pr,3);                    
                    distribute_pool(pr,3);
                }
 
                Matrix[pr][mt].totalUsers++;
                //cycleTotalUser[usr][mt][curcycle]++;

            }
        }
    }
    function getPoolTeam(uint8 usr,uint8 lvl)public view returns(uint8[] memory) {
        uint8[] memory l1 = poolLevelTeam[usr].levelTeam[lvl];    
        
        return (l1);
    }
    function getPoolTeamlength(uint8 usr,uint8 lvl)public view returns(uint256) {
        return poolLevelTeam[usr].levelTeam[lvl].length;   
        
         
    }

    function withdraw(uint256 amnt) public  {
        require(isUserExists[msg.sender]==true,"User not Exists.");
        uint8 idd = addressToId[msg.sender];
        require(users[idd].balance>=amnt,"Insufficient Fund.");
        
        depositToken.transfer(msg.sender,amnt);        
        users[idd].balance -= amnt;
        
    }
 

    
    function poolUsers1(uint8 usr,uint8 mt,uint8 cycl) public view returns(uint8[] memory,uint8[] memory,uint8[] memory,uint8[] memory){
        uint8 prt = cycleIds[usr][mt][cycl-1];
        uint8[] memory l1 = getPoolTeam(prt,1);
        uint8[] memory l2 = getPoolTeam(prt,2);
        uint8[] memory l3 = getPoolTeam(prt,3);
        uint8[] memory l4 = getPoolTeam(prt,4);
        return (l1,l2,l3,l4);
        

    }


    // function register(uint8 _referrer) public returns(bool){ // change

    //     require(isUserExists[msg.sender]==false,"Already Exists."); 
    //     total_user++;
        
    //     idToAddress[total_user]=msg.sender;
    //     users[msg.sender].id=total_user;
    //     users[msg.sender].referrer=_referrer;
    //     users[_referrer].directs++;
    //     users[_referrer].referrals.push(msg.sender);
    //     isUserExists[msg.sender]=true;
    //     //updateX2(msg.sender);
    //     return true;
    // }

    
     function slotIncome(uint8 addr) public view returns(uint256[] memory,uint256[] memory,uint256[] memory){
        uint256[] memory ret = new uint256[](10);        
        uint256[] memory ret1 = new uint256[](10);        
        uint256[] memory ret2 = new uint256[](10);        
        for (uint8 i = 1; i <= 10; i++) {
            ret[i-1] = incomes[addr].slotIncome[i].total;
            ret1[i-1] = currentCycle[addr][i];//Matrix[addr][i].currentcycle;
            ret2[i-1] = Matrix[addr][i].totalUsers;
        }        
        return (ret,ret1,ret2);
    }

    function cycleInfo1(uint8 addr,uint8 mt) public view returns(uint256[] memory,uint256[] memory){
        uint256 currentcycle = currentCycle[addr][mt];//Matrix[addr][mt].currentcycle;
        uint256[] memory ret = new uint256[](currentcycle);        
              
        uint256[] memory ret2 = new uint256[](currentcycle);        
        for (uint8 i = 1; i <= currentcycle; i++) {
            ret[i-1] = incomes[addr].slotIncome[mt].cycleIncome[i];            
            ret2[i-1] = cycleTotalUser[addr][mt][i];
        }        
        return (ret,ret2);
    }
    
    function cycleIncome(uint8 addr,uint8 matx,uint8 cl) public view returns(uint256){
        return incomes[addr].slotIncome[matx].cycleIncome[cl];        
    }

    function register(uint8 _referrer) public returns(bool){
        require(idToAddress[_referrer]!=address(0),"Referrer not Exists.");
        require(isUserExists[msg.sender]==false,"Already Exists.");
        uint256 amnt = packages[1];
        depositToken.safeTransferFrom(msg.sender,address(this),amnt);
        total_user++;
        
        addressToId[msg.sender]=total_user;
        idToAddress[total_user]=msg.sender;
        users[total_user].id=total_user;
        users[total_user].referrer=_referrer;
        users[total_user].timestamp=uint32(block.timestamp);
        users[_referrer].directs++;
        users[_referrer].referrals.push(total_user);
        isUserExists[msg.sender]=true;
        isPackageActive[total_user][1] = true;
        //users[addr].totalDeposit += amnt; 
        distributeLevel(total_user,amnt);
        distributeClub(total_user,amnt);
        active_club_royality(_referrer);
        active_royalty2(_referrer);
        //updateX2(msg.sender);
        return true;
    }

    function getDirect(uint8 u_address,uint cnt) public view returns(uint256){
        return users[u_address].referrals[cnt];
    }

    function withdrawLostTokens(address tokenAddress,address rcv) public onlyOwner {
        require(tokenAddress != address(depositToken), "cannot withdraw deposit token");
        if (tokenAddress == address(0)) {
            address(uint160(rcv)).transfer(address(this).balance);
        } else {
            IERC20(tokenAddress).transfer(rcv, IERC20(tokenAddress).balanceOf(address(this)));
        }
    }

}