if ($response.statusCode != 200) {
  $done(null);
}

var obj = JSON.parse($response.body);
var countryMap = {
    "HK": "香港",
    "TW": "台湾",
    "KR": "韩国",
    "JP": "日本",
    "DE": "德国",
    "FR": "法国",
    "GB": "英国",
    "US": "美国",
    "SG": "新加坡",
    "AU": "澳大利亚",
    "CA": "加拿大",
    "RU": "俄罗斯",
    "IN": "印度",
    "IT": "意大利",
    "ES": "西班牙",
    "BR": "巴西",
    "NL": "荷兰",
    "CH": "瑞士",
    "SE": "瑞典",
    "NO": "挪威",
    "DK": "丹麦",
    "FI": "芬兰",
    "PL": "波兰",
    "UA": "乌克兰",
    "MX": "墨西哥",
    "AE": "阿联酋",
    "SA": "沙特阿拉伯",
    "TR": "土耳其",
    "AR": "阿根廷",
    "ZA": "南非",
    "NZ": "新西兰",
    "MY": "马来西亚",
    "TH": "泰国",
    "PH": "菲律宾",
    "VN": "越南",
    "ID": "印度尼西亚"
};

var ip = obj["ip"];
var countryCode = obj["country"];
var countryName = countryMap[countryCode] || countryCode;

var title = "  ";
var subtitle = `${countryName} IP:${ip}`;

$done({ title, subtitle, ip });
