(function (w, d, e, x) {
	w[e] = function () {
		w.cbk = w.cbk || [];
		w.cbk.push(arguments);
	};
	x = d.createElement("script");
	x.async = true;
	x.id = "zhichiScript";
	x.className="zhiCustomBtn";
	x.src = "https://chat.sobot.com/chat/frame/v2/entrance.js?sysnum=8d1a69761fbf41c286d1102f5adc514e";
	d.body.appendChild(x);
})(window, document, "zc");
zc("config",{
	custom: true,
	manual: true
});

function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
};

var chatgo = false;
function chat(groupid) {
	zc("config", {
		color: "198bfc",
		location: 1,
		groupid: groupid,
		partnerid: randomString(32)
	});
	zc("frame_manual", function (res) {
		zc('frame_status', function(data) {
			console.log(data);
		});
	});
};